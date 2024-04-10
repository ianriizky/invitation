import config from "../../../config/app.js";
import { EventRepository } from "../../repositories/EventRepository.js";
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
export class EventGuestPresenter {
  /**
   * @template {import("../validators/web/EventGuestValidator.js").IndexRequestQuery} RequestQuery
   * @param {Awaited<ReturnType<import("../../repositories/EventGuestRepository.js").EventGuestRepository["paginate"]>>} paginated
   * @param {Awaited<ReturnType<import("../../repositories/EventRepository.js").EventRepository["findBySlug"]>>} event
   * @param {import("express").Request<,,,RequestQuery>} req
   */
  index(paginated, event, req) {
    const { data: event_guests, pagination } = paginated;
    const search = req.query?.search;

    return _.merge(_.clone(event.view_data), {
      event_guests: event_guests.map(event_guest => {
        event_guest.url = EventRepository.getUrl(event, event_guest.guest);
        event_guest.whatsapp_message_url =
          EventRepository.getWhatsappMessageShortUrl(event, event_guest.guest);
        event_guest.use_music = [
          event.view_data?.silent_view,
          "web/event-guest/akad/show-silent.njk",
        ].includes(event_guest.view_path);
        event_guest.destroy_url = `${config.url}/event/${event.slug}/guest/${event_guest.guest.slug}`;

        return event_guest;
      }),
      pagination: {
        ...pagination,
        firstPageUrl: `${pagination.firstPageUrl}${search ? `?search=${search}` : ""}`,
        prevPageUrl:
          pagination.prevPageUrl !== undefined
            ? `${pagination.prevPageUrl}${search ? `&search=${search}` : ""}`
            : undefined,
        nextPageUrl:
          pagination.nextPageUrl !== undefined
            ? `${pagination.nextPageUrl}${search ? `&search=${search}` : ""}`
            : undefined,
        lastPageUrl: `${pagination.lastPageUrl}${search ? `&search=${search}` : ""}`,
      },
      index_url: `${config.url}/event/${event.slug}/guest`,
      create_url: `${config.url}/event/${event.slug}/guest/create`,
      search,
    });
  }

  /**
   * @param {ReturnType<import("../../repositories/EventRepository.js").EventRepository["findByGuestSlug"]>} event
   * @param {import("../../repositories/EventRepository.js").EventGuest} event_guest
   */
  show(event, event_guest) {
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
