import { Controller } from "../Controller.js";

export class AkadController extends Controller {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async show(req, res, next) {
    return res.render("web/akad/show.njk", {
      date: "2024-01-06",
    });
  }
}
