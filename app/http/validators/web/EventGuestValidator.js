import { Validator } from "../Validator.js";

/**
 * @typedef {{
 *   page: import("../../../supports/Pagination.js").RequestQuery["page"];
 * }} IndexRequestQuery
 * @typedef {{
 *   event_slug: import("../../../repositories/EventRepository.js").Event["slug"];
 * }} CreateRequestParam
 * @typedef {{
 *   "event_guest[use_music]": string,
 *   "guest[name]"?: string;
 *   "guest[slug]"?: string;
 *   "guest[domicile]"?: string;
 *   "guest[phone_number]"?: string;
 *   "guest[description]"?: string;
 * }} StoreRequestBody
 * @typedef {{
 *   event_slug: import("../../../repositories/EventRepository.js").Event["slug"];
 *   guest_slug: import("../../../repositories/GuestRepository.js").Guest["slug"];
 * }} ShowRequestParam
 */
export class EventGuestValidator extends Validator {
  index = this.validator.query(
    this.joi.object({
      page: this.joi.number().min(1).optional(),
    }),
  );

  create = this.validator.params(
    this.joi.object({
      event_slug: this.joi.string().required(),
    }),
  );

  store = this.validator.body(
    this.joi.object({
      _csrf: this.joi.string().required(),
      "event_guest[use_music]": this.joi.string().valid("1", "0"),
      "guest[name]": this.joi.string().required(),
      "guest[slug]": this.joi.string().empty(""),
      "guest[domicile]": this.joi.string().empty(""),
      "guest[phone_number]": this.joi.string().empty(""),
      "guest[description]": this.joi.string().empty(""),
    }),
  );

  show = this.validator.params(
    this.joi.object({
      event_slug: this.joi.string().required(),
      guest_slug: this.joi.string().required(),
    }),
  );
}
