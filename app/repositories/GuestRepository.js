import { BadRequestException } from "../exceptions/BadRequestException.js";
import { model as defaultModel } from "../models/index.js";
import { Pagination } from "../supports/Pagination.js";
import { Str } from "../supports/Str.js";
import googleLibphonenumber from "google-libphonenumber";
import _ from "lodash";

/**
 * @typedef {import("../models/index.js").prisma.PrismaClient} PrismaClient
 * @typedef {import("../models/index.js").prisma.Guest} Guest
 * @typedef {import("../models/index.js").prisma.Prisma.GuestDelegate} Model
 */
export class GuestRepository {
  /** @type {PrismaClient} */
  prisma;

  /** @type {Model} */
  model;

  /**
   * @param {PrismaClient} [prisma]
   */
  constructor(prisma) {
    this.prisma = this.appendExtension(prisma || defaultModel);
    this.model = this.prisma.guest;
  }

  /**
   * @param {PrismaClient} prisma
   */
  appendExtension(prisma) {
    return prisma.$extends({
      name: GuestRepository.name,
      query: {
        guest: {
          async create({ args, query }) {
            if (args.data?.slug === undefined) {
              args.data.slug =
                Str.slug(args.data.name) + "-" + Str.randomAlphaNumeric(5);
            }

            if (args.data?.phone_number !== undefined) {
              const phoneNumberUtil =
                googleLibphonenumber.PhoneNumberUtil.getInstance();

              args.data.phone_number = phoneNumberUtil
                .format(
                  phoneNumberUtil.parse(args.data.phone_number, "ID"),
                  googleLibphonenumber.PhoneNumberFormat.E164,
                )
                .replace("+", "");
            }

            return query(args);
          },
        },
      },
    });
  }

  /**
   * @param {import("../supports/Pagination.js").Page} page
   * @param {Parameters<Model["findMany"]>["0"]} args
   */
  async paginate(page, args = undefined) {
    const pagination = new Pagination(page);

    const [total, data] = await Promise.all([
      this.model.count({ ..._.omit(args, ["select", "include", "distinct"]) }),
      this.model.findMany({
        skip: pagination.getSkip(),
        take: pagination.page.size,
        ...args,
      }),
    ]);

    return { data, pagination: pagination.generateMeta(total, data.length) };
  }

  /**
   *
   * @param {import("../repositories/EventRepository.js").Event} event
   * @param {import("../../app/http/validators/web/EventGuestValidator.js").StoreRequestBody} body
   */
  async createByEvent(event, body) {
    const view_path =
      body["event_guest[use_music]"] === "1"
        ? undefined
        : "web/event/akad/show-silent.njk";

    if (body["guest[name_select]"]) {
      const guest = await this.model.findFirstOrThrow({
        where: { name: body["guest[name_select]"] },
        include: {
          event_guests: {
            where: { event: { id: event.id } },
            include: { event: true },
          },
        },
      });

      if (
        guest.event_guests.some(
          event_guest => event_guest.event.id === event.id,
        )
      ) {
        throw new BadRequestException(
          `Guest ${guest.name} for this event is already exists.`,
        );
      }

      return this.prisma.eventGuest.create({
        data: {
          event_id: event.id,
          guest_id: guest.id,
          view_path,
        },
      });
    }

    return this.model.create({
      data: {
        name: body["guest[name_text]"],
        slug: body["guest[slug]"] || undefined,
        domicile: body["guest[domicile]"] || undefined,
        phone_number: body["guest[phone_number]"] || undefined,
        description: body["guest[description]"] || undefined,
        event_guests: {
          create: {
            view_path,
            event: { connect: { id: event.id } },
          },
        },
      },
    });
  }

  /**
   * @param {Guest} guest
   * @param {string} message
   */
  static getWhatsappUrl(guest, message) {
    const queryPhone =
      guest.phone_number !== null ? `phone=${guest.phone_number}&` : "";

    return `https://api.whatsapp.com/send?${queryPhone}text=${encodeURIComponent(
      message,
    )}`;
  }
}
