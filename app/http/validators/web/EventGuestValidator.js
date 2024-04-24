import { Validator } from "../Validator.js";

/**
 * @typedef {{
 *   search?: string;
 *   page: import("../../../supports/Pagination.js").RequestQuery["page"];
 * }} IndexRequestQuery
 * @typedef {{
 *   event_slug: import("../../../repositories/EventRepository.js").Event["slug"];
 * }} CreateRequestParam
 * @typedef {{
 *   "event_guest[use_music]": string,
 *   "event_guest[is_vip]": string,
 *   "guest[name_text]"?: string;
 *   "guest[name_select]"?: string;
 *   "guest[slug]"?: string;
 *   "guest[domicile]"?: string;
 *   "guest[phone_number]"?: string;
 *   "guest[description]"?: string;
 *   "event_guest[number_of_attendees]"?: number;
 * }} StoreRequestBody
 * @typedef {{
 *   event_slug: import("../../../repositories/EventRepository.js").Event["slug"];
 *   guest_slug: import("../../../repositories/GuestRepository.js").Guest["slug"];
 * }} ShowRequestParam
 * @typedef {{
 *   presence_status: import("../../../repositories/MessageRepository.js").Message["presence_status"];
 *   content: import("../../../repositories/MessageRepository.js").Message["content"];
 * }} PostMessageRequestBody
 */
export class EventGuestValidator extends Validator {
  index = this.validator.query(
    this.joi.object({
      search: this.joi.string().optional(),
      page: this.joi.number().min(1).optional(),
    }),
  );

  create = this.validator.params(
    this.joi.object({
      event_slug: this.joi.string().required(),
    }),
  );

  store = this.validator.body(
    this.joi
      .object({
        _csrf: this.joi.string().required(),
        "event_guest[use_music]": this.joi.string().valid("1", "0"),
        "event_guest[is_vip]": this.joi.string().valid("1", "0"),
        "guest[name_text]": this.joi.string().empty(""),
        "guest[name_select]": this.joi.string().empty(""),
        "guest[slug]": this.joi.string().empty(""),
        "guest[domicile]": this.joi.string().empty(""),
        "guest[phone_number]": this.joi.string().empty(""),
        "guest[description]": this.joi.string().empty(""),
        "event_guest[number_of_attendees]": this.joi.number().min(1),
      })
      .xor("guest[name_text]", "guest[name_select]"),
  );

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
