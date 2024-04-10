import { EventRepository } from "../../app/repositories/EventRepository.js";
import { GuestRepository } from "../../app/repositories/GuestRepository.js";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale/id";

export default async function () {
  const view_data_akad = {
    date: new Date("2024-02-02, 08:00:00"),
    reception_start_date: new Date("2024-02-02, 11:00:00"),
    reception_end_date: new Date("2024-02-02, 14:00:00"),
  };

  const eventAkad = await new EventRepository().model.create({
    data: {
      name: "wedding",
      description: "The Wedding of",
      date: view_data_akad.date,
      view_path: "web/event-guest/akad/show-music.njk",
      view_data: {
        silent_view_path: "web/event-guest/akad/show-silent.njk",
        message_view_path: "web/components/message.njk",
        title: "The Wedding of",
        subtitle: "The Wedding of",
        description: format(view_data_akad.date, "EEEE, d LLLL yyyy", {
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
        reception_start_date: view_data_akad.reception_start_date,
        reception_start_date_readable: format(
          view_data_akad.reception_start_date,
          "EEEE, d LLLL yyyy",
          {
            locale: idLocale,
          },
        ),
        reception_start_time_readable: `${format(
          view_data_akad.reception_start_date,
          "HH:mm",
          {
            locale: idLocale,
          },
        )} WIB`,
        reception_date_readable: format(
          view_data_akad.reception_start_date,
          "EEEE, d LLLL yyyy",
          {
            locale: idLocale,
          },
        ),
        reception_time_readable: `${format(
          view_data_akad.reception_start_date,
          "HH:mm",
          {
            locale: idLocale,
          },
        )} WIB - ${format(view_data_akad.reception_end_date, "HH:mm", {
          locale: idLocale,
        })} WIB`,
        reception_end_date: view_data_akad.reception_end_date,
        date_readable: format(view_data_akad.date, "EEEE, d LLLL yyyy", {
          locale: idLocale,
        }),
        date_dmy: format(view_data_akad.date, "dd.MM.yyyy", {
          locale: idLocale,
        }),
        time_readable: `${format(view_data_akad.date, "HH:mm", {
          locale: idLocale,
        })} WIB - Selesai`,
        bride: {
          nick_name: "",
          full_name: "",
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
            image_path: "",
            name: "",
            description: "",
            owner_name: "",
          },
        ],
        location: {
          name: "Masjid Nurhidayah",
          address:
            "Jl. Demang Lebar Daun, Demang Lebar Daun, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30137",
          google_map: {
            url: "https://goo.gl/maps/6SUxY1KZw3ZHRoKR7",
            embed_url:
              "https://maps.google.com/maps?q=masjid%20nurhidayah%20palembang&t=&z=13&ie=UTF8&iwloc=&output=embed",
          },
        },
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
        createMany: {
          data: [{ event_id: eventAkad.id }],
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
          data: [
            {
              event_id: eventAkad.id,
              view_path: eventAkad.view_data.silent_view_path,
            },
          ],
        },
      },
    },
  });
}
