import config from "../../../config/basic-auth.js";
import expressBasicAuth from "express-basic-auth";
import _ from "lodash";

/**
 * @param {Array<keyof typeof config>} roles
 */
export default function (roles) {
  return expressBasicAuth({
    users: _.mapValues(
      _.keyBy(
        roles.map(role => ({
          username: config[role].username,
          password: config[role].password,
        })),
        "username",
      ),
      "password",
    ),
    challenge: true,
    unauthorizedResponse: () =>
      "Unauthorized Access. You are not authorized to access this resource.",
  });
}
