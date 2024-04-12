import { getCurrentUrl } from "../../supports/helpers.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function (req, res, next) {
  /** @type {import("nunjucks").Environment} */
  const view = req.app.get("nunjucks");
  view.addGlobal("current_url", getCurrentUrl(req));

  return next();
}
