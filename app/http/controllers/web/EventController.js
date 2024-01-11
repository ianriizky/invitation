import { NotFoundException } from "../../../exceptions/NotFoundException.js";
import { EventRepository } from "../../../repositories/EventRepository.js";
import { Controller } from "../Controller.js";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale/id";
import _ from "lodash";

export class EventController extends Controller {
  /**
   * @template {import("../../validators/web/EventValidator.js").ShowRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async show(req, res, next) {
    const { event_slug, guest_slug } = req.params;
    const event = await new EventRepository().findBySlug(
      event_slug,
      guest_slug,
    );

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    return res.render(
      event.event_guests[0].current_view_path,
      _.merge(
        _.clone(event.event_guests[0].current_view_data),
        {
          date_readable: format(event.date, "EEEE, d LLLL yyyy", {
            locale: idLocale,
          }),
          time_readable: `${format(event.date, "HH:mm", {
            locale: idLocale,
          })} - Selesai`,
          date_dmy: format(event.date, "dd.MM.yyyy", {
            locale: idLocale,
          }),
        },
        { event, guest: event.event_guests[0].guest },
      ),
    );
  }
}
