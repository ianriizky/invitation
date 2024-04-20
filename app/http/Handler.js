import config from "../../config/app.js";
import urlMiddleware from "./middleware/url.js";
import loggerMiddleware from "./middleware/logger.js";
import responseMacroMiddleware from "./middleware/response-macro.js";
import connectFlash from "connect-flash";
import cookieParser from "cookie-parser";
import express from "express";
import expressSession from "express-session";
import methodOverride from "method-override";

export class Handler {
  /**
   * @param {import("express").Express} app
   */
  constructor(app) {
    this.boot(app);
    this.bootMiddlewareHandler(app);
  }

  /**
   * @param {import("express").Express} app
   */
  boot(app) {
    app.use(
      express.urlencoded({
        extended: false,
        limit: config.maximum_request_body_size,
      }),
    );
    app.use(cookieParser(config.cookie_key));
    app.use(
      expressSession({
        secret: config.session_key,
        cookie: { maxAge: config.cookie_max_age },
        saveUninitialized: true,
        resave: true,
      }),
    );
    app.use(connectFlash());
    app.use(
      methodOverride(function (req) {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
          const method = req.body._method;

          delete req.body._method;

          return method;
        }
      }),
    );

    /**
     * Issue on Heroku when "https" protocol is not picked up by Express.js.
     *
     * @see https://stackoverflow.com/a/46475726/9539211
     */
    if (config.enable_trust_proxy) {
      app.enable("trust proxy");
    }
  }

  /**
   * @param {import("express").Express} app
   */
  bootMiddlewareHandler(app) {
    app.use(loggerMiddleware);
    app.use(responseMacroMiddleware);
    app.use(urlMiddleware);
  }
}
