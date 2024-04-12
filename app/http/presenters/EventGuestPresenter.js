import { EventGuestRepository } from "../../repositories/EventGuestRepository.js";
import { EventRepository } from "../../repositories/EventRepository.js";
import { getBaseUrl } from "../../supports/helpers.js";
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
        event_guest.url = EventRepository.getUrl(event, event_guest.guest, req);
        event_guest.whatsapp_message_url =
          EventRepository.getWhatsappMessageShortUrl(
            event,
            event_guest.guest,
            req,
          );
        event_guest.use_music = EventGuestRepository.isUseMusic(
          event_guest,
          event,
        );
        event_guest.destroy_url = `${getBaseUrl(req)}/event/${event.slug}/guest/${event_guest.guest.slug}`;

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
      index_url: `${getBaseUrl(req)}/event/${event.slug}/guest`,
      create_url: `${getBaseUrl(req)}/event/${event.slug}/guest/create`,
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
        message_url: {
          display: `${event_guest.url}/message`,
          insert: `${event_guest.url}/message`,
        },
      },
      {
        event: _.omit(event, ["view_data"]),
        guest: _.omit(event_guest.guest, "view_data"),
      },
    );
  }
}
