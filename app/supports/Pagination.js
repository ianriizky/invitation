import { prisma } from "../models/index.js";
import collect from "collect.js";
import _ from "lodash";

/**
 * @typedef {{
 *   size: number;
 *   number: number;
 *   url: string;
 * }} Page
 * @typedef {{
 *   [key: string]: any;
 * }} Filter
 * @typedef {{
 *   [key: string]: import("../models/index.js").prisma.Prisma.SortOrder;
 * }} Sort
 * @typedef {string[]} Include
 * @typedef {{
 *   currentPage: Page["number"];
 *   from?: number;
 *   lastPage: number;
 *   recordPerPage: number;
 *   to?: number;
 *   total: number;
 *   prev?: number;
 *   next?: number;
 *   firstPageUrl: string;
 *   prevPageUrl?: string;
 *   nextPageUrl?: string;
 *   lastPageUrl: string;
 *   filter?: Filter;
 *   sort?: Sort;
 * }} Meta
 * @typedef {{
 *   limit?: number;
 *   page?: number;
 * }} RequestQuery
 */
export class Pagination {
  /** @type {Page} */
  static defaultPage = {
    size: 10,
    number: 1,
    url: "/",
  };

  /** @type {Page} */
  page;

  /** @type {Filter | undefined} */
  filter = undefined;

  /** @type {Sort | undefined} */
  sort = undefined;

  /** @type {Include | undefined} */
  include = undefined;

  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = _.merge(_.clone(Pagination.defaultPage), page);
  }

  getSkip() {
    return Number((this.page.number - 1) * this.page.size);
  }

  /**
   * @param {string[]} allowedKeys
   */
  setFilter(filter, allowedKeys) {
    this.filter = collect(allowedKeys)
      .mapWithKeys(key => [
        key,
        filter === undefined || filter[key] === undefined
          ? undefined
          : filter[key].split(","),
      ])
      .filter()
      .all();

    return this;
  }

  /**
   * @param {string[]} allowedKeys
   */
  setSort(sort, allowedKeys) {
    if (typeof sort === "string") {
      sort = sort.split(",");

      this.sort = (() => {
        let result = {};

        allowedKeys.forEach(key => {
          if (sort.includes(key)) {
            result[key] = prisma.Prisma.SortOrder.asc;
          } else if (sort.includes(`-${key}`)) {
            result[key] = prisma.Prisma.SortOrder.desc;
          }
        });

        return result;
      })();
    }

    return this;
  }

  /**
   * @param {string[]} allowedKeys
   * @returns {Array<string>}
   */
  setInclude(include, allowedKeys) {
    if (typeof sort === "string") {
      include = include.split(",");

      this.include = (() => {
        let result = {};

        allowedKeys.forEach(key => {
          if (include.includes(key)) {
            result.push(key);
          }
        });

        return result;
      })();
    }

    return this;
  }

  /**
   * @param {Meta["total"]} total
   * @param {Meta["recordPerPage"]} recordPerPage
   * @returns {Meta}
   */
  generateMeta(total, recordPerPage) {
    const currentPage = this.page.number;
    const from = total > 0 ? (currentPage - 1) * recordPerPage + 1 : undefined;
    const to = total > 0 ? from + recordPerPage - 1 : undefined;
    const lastPage = Math.max(Number(Math.ceil(total / recordPerPage)), 1);
    const next = currentPage < lastPage ? currentPage + 1 : undefined;
    const prev = currentPage > 1 ? currentPage - 1 : undefined;

    return {
      currentPage,
      from,
      lastPage,
      recordPerPage,
      to,
      total,
      next: currentPage < lastPage ? currentPage + 1 : undefined,
      prev: currentPage > 1 ? currentPage - 1 : undefined,
      firstPageUrl: this.page.url,
      prevPageUrl:
        prev !== undefined ? `${this.page.url}?page=${prev}` : undefined,
      nextPageUrl:
        next !== undefined ? `${this.page.url}?page=${next}` : undefined,
      lastPageUrl: `${this.page.url}?page=${lastPage}`,
    };
  }
}
