import { BadRequestException } from "../exceptions/BadRequestException.js";
import { model as defaultModel } from "../models/index.js";
import { Pagination } from "../supports/Pagination.js";
import _ from "lodash";

/**
 * @typedef {import("../models/index.js").prisma.PrismaClient} PrismaClient
 * @typedef {import("../models/index.js").prisma.EventGuest} EventGuest
 * @typedef {import("../models/index.js").prisma.Prisma.EventGuestDelegate} Model
 */
export class EventGuestRepository {
  /** @type {PrismaClient} */
  prisma;

  /** @type {Model} */
  model;

  /**
   * @param {PrismaClient} [prisma]
   */
  constructor(prisma) {
    this.prisma = prisma || defaultModel;
    this.model = this.prisma.eventGuest;
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
   * @param {import("./EventRepository.js").Event} event
   * @param {import("../../app/http/validators/web/EventGuestValidator.js").StoreRequestBody} body
   */
  async createByEvent(event, body) {
    const guest = await this.prisma.guest.findFirstOrThrow({
      where: { name: body["guest[name_select]"] },
      include: {
        event_guests: {
          where: { event: { id: event.id } },
          include: { event: true },
        },
      },
    });

    if (
      guest.event_guests.some(event_guest => event_guest.event.id === event.id)
    ) {
      throw new BadRequestException(
        `Guest ${guest.name} for this event is already exists.`,
      );
    }

    return this.prisma.eventGuest.create({
      data: {
        event_id: event.id,
        guest_id: guest.id,
        ...EventGuestRepository.createView(
          {
            useMusic: body["event_guest[use_music]"] === "1",
            isVip: body["event_guest[is_vip]"] === "1",
          },
          event,
        ),
      },
    });
  }

  /**
   * @param {EventGuest} model
   * @param {import("./EventRepository.js").Event} event
   */
  static isUseMusic(model, event) {
    return (
      model.view_data?.use_music ||
      model.view_path !== event?.view_data?.silent_view_path
    );
  }

  /**
   * @param {EventGuest} model
   */
  static isVip(model) {
    return model.view_data?.is_vip;
  }

  /**
   * @param {{ useMusic?: boolean; isVip?: boolean }} data
   * @param {import("./EventRepository.js").Event} event
   */
  static createView(data, event) {
    const view_data = {
      use_music: data?.useMusic,
      is_vip: data?.isVip,
    };

    const view_path =
      !data.useMusic && event.view_data?.silent_view_path
        ? event.view_data?.silent_view_path
        : undefined;

    return { view_path, view_data };
  }
}
