import { EventRepository } from "../../app/repositories/EventRepository.js";
import { GuestRepository } from "../../app/repositories/GuestRepository.js";
import config from "../../config/app.js";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale/id";

export default async function () {
  const date = new Date("2024-02-02, 08:00:00");

  const eventAkad = await new EventRepository().model.create({
    data: {
      name: "wedding",
      description: "The Wedding of",
      date,
      view_path: "web/event/akad-music/show.njk",
      view_data: {
        title: "The Wedding of",
        description: format(date, "EEEE, d LLLL yyyy", { locale: idLocale }),
        url: config.url,
        thumbnail_image_path: "logo.png",
        thumbnail_image_width: 661,
        thumbnail_image_height: 452,
        thumbnail_image_mime_type: "image/png",
      },
    },
  });

  await new GuestRepository().model.create({
    data: {
      name: "Dummy Music",
      domicile: "Denpasar",
      phone_number: "628111000111",
      description: "lorem ipsum",
      event_guests: {
        create: {
          event: { connect: { id: eventAkad.id } },
        },
      },
    },
  });

  await new GuestRepository().model.create({
    data: {
      name: "Dummy Silent",
      domicile: "Yogyakarta",
      phone_number: "628111000111",
      description: "lorem ipsum",
      event_guests: {
        create: {
          view_path: "web/event/akad-silent/show.njk",
          event: { connect: { id: eventAkad.id } },
        },
      },
    },
  });
}
