import { model as defaultModel } from "../models/index.js";
import { Pagination } from "../supports/Pagination.js";
import { Str } from "../supports/Str.js";
import { getBaseUrl } from "../supports/helpers.js";
import { GuestRepository } from "./GuestRepository.js";
import _ from "lodash";

/**
 * @typedef {import("../models/index.js").prisma.PrismaClient} PrismaClient
 * @typedef {import("../models/index.js").prisma.Event} Event
 * @typedef {import("../models/index.js").prisma.EventGuest} EventGuest
 * @typedef {import("../models/index.js").prisma.Prisma.EventDelegate} Model
 */
export class EventRepository {
  /** @type {PrismaClient} */
  prisma;

  /** @type {Model} */
  model;

  /** @type {import("express").Request} */
  req;

  /**
   * @param {import("express").Request} req
   * @param {PrismaClient} [prisma]
   */
  constructor(req, prisma) {
    this.req = req;
    this.prisma = this.appendExtension(prisma || defaultModel);
    this.model = this.prisma.event;
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
          url: {
            needs: { event: true, guest: true },
            compute: ({ event, guest }) => {
              return EventRepository.getUrl(event, guest, this.req);
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
    return _.merge(_.clone(event.view_data), event_guest.view_data || {});
  }

  /**
   * @param {Event} event
   * @param {import("./GuestRepository.js").Guest} guest
   * @param {import("express").Request} req
   */
  static getUrl(event, guest, req) {
    return `${getBaseUrl(req)}/event/${event.slug}/${guest.slug}`;
  }

  /**
   * @param {import("nunjucks").Environment} view
   * @param {Event} event
   * @param {import("./GuestRepository.js").Guest} guest
   * @param {import("express").Request} req
   */
  static getWhatsappMessage(view, event, guest, req) {
    return view.render("whatsapp/event-guest/akad/show.njk", {
      guest_name: guest.name,
      bride_full_name: "Eka Budiarti & Septianata Rizky Pratama",
      url: this.getUrl(event, guest, req),
      bride_nick_name: "Eka & Ian",
    });
  }

  /**
   * @param {import("nunjucks").Environment} view
   * @param {Event} event
   * @param {import("./GuestRepository.js").Guest} guest
   * @param {import("express").Request} req
   */
  static getWhatsappMessageUrl(view, event, guest, req) {
    return GuestRepository.getWhatsappUrl(
      guest,
      this.getWhatsappMessage(view, event, guest, req),
    );
  }

  /**
   * @param {Event} event
   * @param {import("./GuestRepository.js").Guest} guest
   * @param {import("express").Request} req
   */
  static getWhatsappMessageShortUrl(event, guest, req) {
    return `${getBaseUrl(req)}/event/${event.slug}/${guest.slug}/whatsapp-message`;
  }

  /**
   * @param {Event["slug"]} slug
   */
  findBySlug(slug) {
    return this.model.findFirst({
      where: { slug },
    });
  }

  /**
   * @param {Event["slug"]} slug
   * @param {import("./GuestRepository.js").Guest["slug"]} guest_slug
   */
  findByGuestSlug(slug, guest_slug) {
    return this.model.findFirst({
      include: {
        event_guests: {
          where: { guest: { slug: guest_slug } },
          include: { event: true, guest: true },
        },
      },
      where: {
        slug,
        event_guests: {
          some: {
            guest: { slug: guest_slug },
          },
        },
      },
    });
  }
}
