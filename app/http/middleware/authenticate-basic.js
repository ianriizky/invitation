import config from "../../../config/basic-auth.js";
import expressBasicAuth from "express-basic-auth";

export default expressBasicAuth({
  users: { [config.username]: config.password },
  challenge: true,
  unauthorizedResponse: () =>
    "Unauthorized Access. You are not authorized to access this resource.",
});
