import { loadEnv } from "../app/supports/helpers.js";

loadEnv();

export default {
  admin: {
    username: process.env.BASIC_ADMIN_USERNAME,
    password: process.env.BASIC_ADMIN_PASSWORD,
  },
  default: {
    username: process.env.BASIC_USERNAME,
    password: process.env.BASIC_PASSWORD,
  },
};
