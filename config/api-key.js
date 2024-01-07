import { loadEnv } from "../app/supports/helpers.js";

loadEnv();

export default {
  sandbox: process.env.API_KEY_SANDBOX,
  production: process.env.API_KEY_PROD,
};
