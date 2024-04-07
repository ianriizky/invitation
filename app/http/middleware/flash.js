/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function (req, res, next) {
  if (req?.flash) {
    const flash = getFlash(req);

    /** @type {import("nunjucks").Environment} */
    const view = req.app.get("nunjucks");

    view.addGlobal("flash", flash.length > 0 ? flash[0] : undefined);
  }

  return next();
}

/**
 * @param {import("express").Request} req
 * @param {any | any []} message
 */
export function createFlash(req, message) {
  req.flash("flash", message);
}

/**
 * @param {import("express").Request} req
 */
export function getFlash(req) {
  return req.flash("flash");
}
