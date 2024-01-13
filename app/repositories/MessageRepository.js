import { model as defaultModel } from "../models/index.js";
import { Pagination } from "../supports/Pagination.js";

/**
 * @typedef {import("../models/index.js").prisma.PrismaClient} PrismaClient
 * @typedef {import("../models/index.js").prisma.Message} Message
 * @typedef {import("../models/index.js").prisma.Prisma.MessageDelegate} Model
 */
export class MessageRepository {
  /** @type {Model} */
  model;

  /**
   * @param {PrismaClient} [prisma]
   */
  constructor(prisma) {
    this.model = (prisma || defaultModel).message;
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
}
