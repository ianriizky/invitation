import config from "../../../config/app.js";
import { EventRepository } from "../../repositories/EventRepository.js";

export class EventGuestPresenter {
  /**
   * @param {Awaited<ReturnType<import("../../repositories/GuestRepository.js").GuestRepository["paginate"]>>} paginated
   * @param {Awaited<ReturnType<import("../../repositories/EventRepository.js").EventRepository["findBySlug"]>>} event
   */
  index(paginated, event) {
    const { data: guests, pagination } = paginated;

    return {
      guests: guests.map(guest => {
        guest.url = EventRepository.getUrl(event, guest);
        guest.whatsapp_message_url = EventRepository.getWhatsappMessageShortUrl(
          event,
          guest,
        );
        guest.event_guests = guest.event_guests.map(event_guest => {
          event_guest.use_music =
            event_guest.view_path !== "web/event/akad/show-silent.njk";
          event_guest.destroy_url = `${config.url}/event/${event.slug}/guest/${guest.slug}`;

          return event_guest;
        });

        return guest;
      }),
      pagination,
      index_url: `${config.url}/event/${event.slug}/guest`,
      create_url: `${config.url}/event/${event.slug}/guest/create`,
    };
  }
}
