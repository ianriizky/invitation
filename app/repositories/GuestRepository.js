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
  /** @type {Model} */
  model;

  /**
   * @param {PrismaClient} [prisma]
   */
  constructor(prisma) {
    prisma = this.appendExtension(prisma || defaultModel);

    this.model = prisma.guest;
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
   * @param {Guest} guest
   * @param {string} message
   */
  static getWhatsappLink(guest, message) {
    const queryPhone =
      guest.phone_number !== null ? `phone=${guest.phone_number}&` : "";

    return `https://api.whatsapp.com/send?${queryPhone}text=${encodeURIComponent(
      message,
    )}`;
  }
}
