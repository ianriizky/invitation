import { loadEnv } from "../app/supports/helpers.js";

loadEnv();

export default {
  username: process.env.BASIC_USERNAME,
  password: process.env.BASIC_PASSWORD,
};
