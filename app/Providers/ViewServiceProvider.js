import nunjucks from "nunjucks";

export class ViewServiceProvider {
  /**
   * @param {import("express").Express} app
   */
  constructor(app) {
    /** @type {import("express").Express} */
    this.app = app;
  }

  boot() {
    nunjucks.configure("resources/views", {
      autoescape: true,
      express: this.app,
    });
  }
}
