import { model as defaultModel } from "../models/index.js";
import { Pagination } from "../supports/Pagination.js";
import { Str } from "../supports/Str.js";

/**
 * @typedef {import("../models/index.js").prisma.PrismaClient} PrismaClient
 * @typedef {import("../models/index.js").prisma.Event} Event
 * @typedef {import("../models/index.js").prisma.Prisma.EventDelegate} Model
 */
export class EventRepository {
  /** @type {Model} */
  model;

  /**
   * @param {PrismaClient} [prisma]
   */
  constructor(prisma) {
    prisma = this.appendExtension(prisma || defaultModel);

    this.model = prisma.event;
  }

  /**
   * @param {PrismaClient} prisma
   */
  appendExtension(prisma) {
    return prisma.$extends({
      name: EventRepository.name,
      query: {
        event: {
          async create({ args, query }) {
            if (args.data?.slug === undefined) {
              args.data.slug = Str.slug(args.data.name);
            }

            return query(args);
          },
        },
      },
      result: {
        eventGuest: {
          current_view_path: {
            needs: { view_path: true, view_data: true, event: true },
            compute({ view_path, view_data, event }) {
              return EventRepository.getCurrentViewPath(
                { view_path, view_data },
                event,
              );
            },
          },
          current_view_data: {
            needs: { view_path: true, view_data: true, event: true },
            compute({ view_path, view_data, event }) {
              return EventRepository.getCurrentViewData(
                { view_path, view_data },
                event,
              );
            },
          },
          whatsapp_link: {
            needs: { event: true, guest: true },
            compute({ event, guest }) {
              return EventRepository.getWhatsappLink(event, guest);
            },
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
      this.model.count({ ...args }),
      this.model.findMany({
        skip: pagination.getSkip(),
        take: pagination.page.size,
        ...args,
      }),
    ]);

    return { data, pagination: pagination.generateMeta(total, data.length) };
  }

  /**
   * @param {import("../models/index.js").prisma.EventGuest} event_guest
   * @param {Event} event
   */
  static getCurrentViewPath(event_guest, event) {
    return event_guest.view_path || event.view_path;
  }

  /**
   * @param {import("../models/index.js").prisma.EventGuest} event_guest
   * @param {Event} event
   */
  static getCurrentViewData(event_guest, event) {
    return event_guest.view_data || event.view_data;
  }

  /**
   * @param {Event} event
   * @param {import("./GuestRepository.js").Guest} guest
   */
  static getWhatsappLink(event, guest) {
    if (guest.phone_number !== null) {
      return `https://api.whatsapp.com/send?phone=${guest.phone_number}&text=asdasd`;
    }
  }
}
