import { model as defaultModel } from "../models/index.js";
import { Pagination } from "../supports/Pagination.js";
import _ from "lodash";

/**
 * @typedef {import("../models/index.js").prisma.PrismaClient} PrismaClient
 * @typedef {import("../models/index.js").prisma.Message} Message
 * @typedef {import("../models/index.js").prisma.Prisma.MessageDelegate} Model
 */
export class MessageRepository {
  /** @type {PrismaClient} */
  prisma;

  /** @type {Model} */
  model;

  /**
   * @param {PrismaClient} [prisma]
   */
  constructor(prisma) {
    this.prisma = prisma || defaultModel;
    this.model = this.prisma.message;
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
   * @param {import("./EventRepository.js").Event["slug"]} event_slug
   * @param {number} take
   */
  findManyByEventSlug(event_slug, take = 50) {
    return this.model.findMany({
      where: {
        event_guest: { is: { event: { slug: event_slug } } },
      },
      include: { event_guest: { include: { guest: true } } },
      take,
      orderBy: { updated_at: "desc" },
    });
  }

  /**
   * @param {import("../models/index.js").prisma.EventGuest} event_guest
   * @param {Parameters<Model['upsert']>[0]["create"] | Parameters<Model['upsert']>[0]["update"]} data
   */
  upsertByEventGuest(event_guest, data) {
    return this.model.upsert({
      where: { event_guest_id: event_guest.id },
      create: {
        ...data,
        event_guest: { connect: { id: event_guest.id } },
      },
      update: data,
    });
  }
}
