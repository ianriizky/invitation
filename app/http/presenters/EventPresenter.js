import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale/id";
import _ from "lodash";

/**
 * @typedef {{
 *   date: string;
 *   message_url: {
 *     display: string;
 *     insert: string;
 *   };
 * }} ViewData
 */
export class EventPresenter {
  /**
   * @param {ReturnType<import("../../repositories/EventRepository.js").EventRepository["findBySlug"]>} event
   */
  show(event) {
    /** @type {import("../../repositories/EventRepository.js").EventGuest} */
    const event_guest = event.event_guests[0];

    return _.merge(
      _.clone(event_guest.current_view_data),
      {
        date_readable: format(event.date, "EEEE, d LLLL yyyy", {
          locale: idLocale,
        }),
        date_dmy: format(event.date, "dd.MM.yyyy", {
          locale: idLocale,
        }),
        time_readable: `${format(event.date, "HH:mm", {
          locale: idLocale,
        })} WIB - Selesai`,
        reception_start_date_readable: format(
          event.view_data.reception_start_date,
          "EEEE, d LLLL yyyy",
          {
            locale: idLocale,
          },
        ),
        reception_start_time_readable: `${format(
          event.view_data.reception_start_date,
          "HH:mm",
          {
            locale: idLocale,
          },
        )} WIB`,
        reception_date_readable: format(
          event.view_data.reception_start_date,
          "EEEE, d LLLL yyyy",
          {
            locale: idLocale,
          },
        ),
        reception_time_readable: `${format(
          event.view_data.reception_start_date,
          "HH:mm",
          {
            locale: idLocale,
          },
        )} WIB - ${format(event.view_data.reception_end_date, "HH:mm", {
          locale: idLocale,
        })} WIB`,
        message_url: {
          display: `${event_guest.url}/message`,
          insert: `${event_guest.url}/message`,
        },
      },
      { event, guest: event_guest.guest },
    );
  }
}
