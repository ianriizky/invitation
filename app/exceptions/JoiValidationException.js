import config from "../../config/app.js";
import { Exception } from "./Exception.js";
import escapeHTML from "escape-html";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class JoiValidationException extends Exception {
  /** @type {import("joi").ValidationResult} */
  result;

  /**
   * @param {import("joi").ValidationResult} result
   */
  constructor(result) {
    super(ReasonPhrases.BAD_REQUEST);

    this.setStatusCode(StatusCodes.BAD_REQUEST);

    this.result = result;
    this.stack = result.error.stack;
  }

  render() {
    const DOUBLE_SPACE_REGEXP = /\x20{2}/g;
    const NEWLINE_REGEXP = /\n/g;

    const body = escapeHTML(
      config.is_development ? this.result.error : this.message,
    )
      .replace(NEWLINE_REGEXP, "<br>")
      .replace(DOUBLE_SPACE_REGEXP, " &nbsp;");

    return (
      "<!DOCTYPE html>\n" +
      '<html lang="en">\n' +
      "<head>\n" +
      '<meta charset="utf-8">\n' +
      "<title>Error</title>\n" +
      "</head>\n" +
      "<body>\n" +
      "<pre>" +
      body +
      "</pre>\n" +
      "</body>\n" +
      "</html>\n"
    );
  }
}
