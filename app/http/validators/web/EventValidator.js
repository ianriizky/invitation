import { Validator } from "../Validator.js";

/**
 * @typedef {{
 *   event_slug: string;
 *   guest_slug: string;
 * }} ShowRequestParam
 */
export class EventValidator extends Validator {
  show = this.validator.params(
    this.joi.object({
      event_slug: this.joi.string().required(),
      guest_slug: this.joi.string().required(),
    }),
  );
}
