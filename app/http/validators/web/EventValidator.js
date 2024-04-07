import { Validator } from "../Validator.js";

/**
 * @typedef {{
 *   search?: string;
 *   page: import("../../../supports/Pagination.js").RequestQuery["page"];
 * }} IndexRequestQuery
 * @typedef {{
 *   event_slug: import("../../../repositories/EventRepository.js").Event["slug"];
 * }} ShowRequestParam
 */
export class EventValidator extends Validator {
  index = this.validator.query(
    this.joi.object({
      search: this.joi.string().optional(),
      page: this.joi.number().min(1).optional(),
    }),
  );

  show = this.validator.params(
    this.joi.object({
      event_slug: this.joi.string().required(),
    }),
  );
}
