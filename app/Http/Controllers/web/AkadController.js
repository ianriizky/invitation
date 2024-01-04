import { Controller } from "../Controller.js";

export class AkadController extends Controller {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async show(req, res, next) {
    const viewData = {
      date: "2024-02-10",
    };

    return res.render("akad.njk", { viewData });
  }
}