import { EventRepository } from "../../app/repositories/EventRepository.js";
import { GuestRepository } from "../../app/repositories/GuestRepository.js";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale/id";

export default async function () {
  const events = await Promise.all([akad(), resepsi()]);

  await new GuestRepository().model.create({
    data: {
      name: "Dummy Music",
      domicile: "Denpasar",
      phone_number: "628111000111",
      description: "lorem ipsum",
      event_guests: {
        createMany: {
          data: events.map(event => ({ event_id: event.id })),
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
        createMany: {
          data: events.map(event => ({
            event_id: event.id,
            view_path: event.view_data.silent_view_path,
          })),
        },
      },
    },
  });
}

function akad() {
  const view_data = {
    date: new Date("2024-02-02, 08:00:00"),
    reception_start_date: new Date("2024-02-02, 11:00:00"),
    reception_end_date: new Date("2024-02-02, 14:00:00"),
  };

  return new EventRepository().model.create({
    data: {
      name: "wedding",
      description: "The Wedding of",
      date: view_data.date,
      view_path: "web/event-guest/akad/show-music.njk",
      view_data: {
        silent_view_path: "web/event-guest/akad/show-silent.njk",
        message_view_path: "web/components/message.njk",
        title: "The Wedding of",
        subtitle: "The Wedding of",
        description: format(view_data.date, "EEEE, d LLLL yyyy", {
          locale: idLocale,
        }),
        thumbnail_image_path: "logo-wide.png",
        thumbnail_image_width: 661,
        thumbnail_image_height: 452,
        thumbnail_image_mime_type: "image/png",
        icon_path: "logo.svg",
        logo_path: "logo-black.svg",
        akad_title: "Akad Nikah",
        reception_title: "Resepsi Pernikahan",
        reception_start_date: view_data.reception_start_date,
        reception_start_date_readable: format(
          view_data.reception_start_date,
          "EEEE, d LLLL yyyy",
          {
            locale: idLocale,
          },
        ),
        reception_start_time_readable: `${format(
          view_data.reception_start_date,
          "HH:mm",
          {
            locale: idLocale,
          },
        )} WIB`,
        reception_date_readable: format(
          view_data.reception_start_date,
          "EEEE, d LLLL yyyy",
          {
            locale: idLocale,
          },
        ),
        reception_time_readable: `${format(
          view_data.reception_start_date,
          "HH:mm",
          {
            locale: idLocale,
          },
        )} WIB - ${format(view_data.reception_end_date, "HH:mm", {
          locale: idLocale,
        })} WIB`,
        reception_end_date: view_data.reception_end_date,
        date_readable: format(view_data.date, "EEEE, d LLLL yyyy", {
          locale: idLocale,
        }),
        date_dmy: format(view_data.date, "dd.MM.yyyy", {
          locale: idLocale,
        }),
        time_readable: `${format(view_data.date, "HH:mm", {
          locale: idLocale,
        })} WIB - Selesai`,
        bride: {
          title: "",
          fullname: "",
          instagram_url: "https://www.instagram.com/",
          instagram_username: "",
          parent_description: "Putri pertama dari Bapak & Ibu",
        },
        groom: {
          title: "",
          fullname: "",
          instagram_url: "https://www.instagram.com/",
          instagram_username: "",
          parent_description: "Putra pertama dari Bapak & Ibu",
        },
        gifts: [
          {
            image_path: "img/bank/bca.png",
            button_name: "Kirim Kado Online",
            name: "BCA",
            description: "",
            owner_name: "a/n",
          },
          {
            button_name: "Kirim Kado Offline",
            name: "Rumah",
            description: "",
            owner_name: "a/n",
          },
        ],
        location: {
          name: "",
          address: "",
          google_map: {
            url: "https://maps.app.goo.gl/",
            embed_url: "https://www.google.com/maps/embed",
          },
        },
      },
    },
  });
}

function resepsi() {
  const view_data = {
    start_date: new Date("2024-02-02, 11:00:00"),
    end_date: new Date("2024-02-02, 14:00:00"),
  };
  return new EventRepository().model.create({
    data: {
      name: "resepsi",
      description: "The Wedding of",
      date: view_data.start_date,
      view_path: "web/event-guest/resepsi/show-music.njk",
      view_data: {
        silent_view_path: "web/event-guest/resepsi/show-silent.njk",
        message_view_path: "web/components/message.njk",
        title: "The Wedding of",
        subtitle: "The Wedding of",
        description: format(view_data.start_date, "EEEE, d LLLL yyyy", {
          locale: idLocale,
        }),
        thumbnail_image_path: "resepsi/logo-wide.png",
        thumbnail_image_width: 661,
        thumbnail_image_height: 452,
        thumbnail_image_mime_type: "image/png",
        icon_path: "resepsi/logo.svg",
        logo_path: "resepsi/logo-black.svg",
        reception_title: "Resepsi Pernikahan",
        reception_date_readable: format(
          view_data.start_date,
          "EEEE, d LLLL yyyy",
          {
            locale: idLocale,
          },
        ),
        reception_time_readable: `${format(view_data.start_date, "HH:mm", {
          locale: idLocale,
        })} WIB - ${format(view_data.end_date, "HH:mm", {
          locale: idLocale,
        })} WIB`,
        date_dmy: format(view_data.start_date, "dd.MM.yyyy", {
          locale: idLocale,
        }),
        bride: {
          title: "",
          fullname: "",
          instagram_url: "https://www.instagram.com/",
          instagram_username: "",
          parent_description: "Putri pertama dari Bapak & Ibu",
        },
        groom: {
          title: "",
          fullname: "",
          instagram_url: "https://www.instagram.com/",
          instagram_username: "",
          parent_description: "Putra pertama dari Bapak & Ibu",
        },
        gifts: [
          {
            image_path: "img/bank/bca.png",
            button_name: "Kirim Kado Online",
            name: "BCA",
            description: "",
            owner_name: "a/n",
          },
          {
            button_name: "Kirim Kado Offline",
            name: "Rumah",
            description: "",
            owner_name: "a/n",
          },
        ],
        location: {
          name: "",
          address: "",
          google_map: {
            url: "https://maps.app.goo.gl/",
            embed_url: "https://www.google.com/maps/embed",
          },
        },
      },
    },
  });
}
