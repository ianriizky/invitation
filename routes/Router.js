import { setContentType } from "../app/supports/helpers.js";
import api from "./api/index.js";
import web from "./web/index.js";
import express from "express";

export class Router {
  /**
   * @param {import("express").Express} app
   */
  constructor(app) {
    app.use(this.generateRouter());
  }

  generateRouter() {
    const router = express.Router();

    router.use(express.static("public"));
    router.use(setContentType("text/html"), web);

    router.use(
      setContentType("application/json"),
      express.json({ type: "application/json" }),
      api,
    );

    return router;
  }
}
