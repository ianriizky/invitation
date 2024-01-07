import { Validator } from "../Validator.js";

/**
 * @typedef {import("../../../../supports/Pagination.js").RequestQuery & ProvincesByCountryIDRequestParam} CountryRequestQuery
 *
 * @typedef {{
 *   country_id?: number;
 * }} ProvincesByCountryIDRequestParam
 * @typedef {import("../../../../supports/Pagination.js").RequestQuery & {
 *   province_id?: number;
 * }} ProvincesByCountryIDRequestQuery
 */
export class AkadValidator extends Validator {
  show = this.validator.params(
    this.joi.object({
      slug: this.joi.string().required(),
    }),
  );
}
