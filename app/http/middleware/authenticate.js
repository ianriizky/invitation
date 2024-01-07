import config from "../../../config/api-key.js";
import { ForbiddenException } from "../../exceptions/ForbiddenException.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function (req, res, next) {
  const isDevelopment = req.app.get("env") === "development";
  const apiKey = isDevelopment ? config.sandbox : config.production;

  if (apiKey !== req.header("X-API-Key")) {
    throw new ForbiddenException(
      "Unauthorized Access. You are not authorized to access this resource.",
    );
  }

  return next();
}
