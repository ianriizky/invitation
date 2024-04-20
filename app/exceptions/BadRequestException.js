import { Exception } from "./Exception.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class BadRequestException extends Exception {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message || ReasonPhrases.BAD_REQUEST);

    this.setStatusCode(StatusCodes.BAD_REQUEST);
  }
}
