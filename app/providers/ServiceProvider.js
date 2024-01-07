import { ViewServiceProvider } from "./ViewServiceProvider.js";

export class ServiceProvider {
  /**
   * @param {import("express").Express} app
   */
  constructor(app) {
    this.boot(app);
  }

  /**
   * @param {import("express").Express} app
   */
  boot(app) {
    new ViewServiceProvider(app).boot();
  }
}
