import { Exception } from "./Exception.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class ForbiddenException extends Exception {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message || ReasonPhrases.FORBIDDEN);

    this.setStatusCode(StatusCodes.FORBIDDEN);
  }
}
