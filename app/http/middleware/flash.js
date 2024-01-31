/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function (req, res, next) {
  if (req?.flash) {
    const flashes = getFlash(req);

    if (flashes) {
      /** @type {import("nunjucks").Environment} */
      const view = req.app.get("nunjucks");

      view.addGlobal("flashes", flashes);
    }
  }

  return next();
}

/**
 * @param {import("express").Request} req
 * @param {any | any []} message
 * @param {string} key
 */
export function createFlash(req, message, key = "flashes") {
  req.flash(key, message);
}

/**
 * @param {import("express").Request} req
 * @param {string} key
 */
export function getFlash(req, key = "flashes") {
  return req.flash(key);
}
