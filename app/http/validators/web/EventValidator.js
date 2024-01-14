import { Validator } from "../Validator.js";

/**
 * @typedef {{
 *   event_slug: import("../../../repositories/EventRepository.js").Event["slug"];
 *   guest_slug: import("../../../repositories/GuestRepository.js").Guest["slug"];
 * }} ShowRequestParam
 * @typedef {{
 *   presence_status: import("../../../repositories/MessageRepository.js").Message["presence_status"];
 *   content: import("../../../repositories/MessageRepository.js").Message["content"];
 * }} PostMessageRequestBody
 */
export class EventValidator extends Validator {
  show = this.validator.params(
    this.joi.object({
      event_slug: this.joi.string().required(),
      guest_slug: this.joi.string().required(),
    }),
  );

  postMessage = this.validator.body(
    this.joi.object({
      presence_status: this.joi.string().required(),
      content: this.joi.string().required(),
    }),
  );
}
