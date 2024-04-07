import config from "../../../config/app.js";
import { EventRepository } from "../../repositories/EventRepository.js";
import _ from "lodash";

export class EventGuestPresenter {
  /**
   * @template {import("../validators/web/EventGuestValidator.js").IndexRequestQuery} RequestQuery
   * @param {Awaited<ReturnType<import("../../repositories/EventGuestRepository.js").EventGuestRepository["paginate"]>>} paginated
   * @param {Awaited<ReturnType<import("../../repositories/EventRepository.js").EventRepository["findBySlug"]>>} event
   * @param {import("express").Request<,,,RequestQuery>} req
   */
  index(paginated, event, req) {
    const { data: event_guests, pagination } = paginated;
    const index_url = `${config.url}/event/${event.slug}/guest`;
    const search = req.query?.search;

    return _.merge(_.clone(event.view_data), {
      event_guests: event_guests.map(event_guest => {
        event_guest.url = EventRepository.getUrl(event, event_guest.guest);
        event_guest.whatsapp_message_url =
          EventRepository.getWhatsappMessageShortUrl(event, event_guest.guest);
        event_guest.use_music =
          event_guest.view_path !== "web/event/akad/show-silent.njk";
        event_guest.destroy_url = `${config.url}/event/${event.slug}/guest/${event_guest.guest.slug}`;

        return event_guest;
      }),
      pagination: {
        ...pagination,
        first_page_url: `${index_url}${search && `?search=${req.query.search}`}`,
        prev_page_url:
          pagination.currentPage !== 1 &&
          `${index_url}?page=${pagination.prev}${search && `&search=${req.query.search}`}`,
        next_page_url:
          pagination.currentPage !== pagination.lastPage &&
          `${index_url}?page=${pagination.next}${search && `&search=${req.query.search}`}`,
        last_page_url: `${index_url}?page=${pagination.lastPage}${search && `&search=${req.query.search}`}`,
      },
      index_url,
      create_url: `${config.url}/event/${event.slug}/guest/create`,
      search,
    });
  }
}
