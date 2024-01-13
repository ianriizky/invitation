import { EventRepository } from "../../app/repositories/EventRepository.js";
import { GuestRepository } from "../../app/repositories/GuestRepository.js";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale/id";

export default async function () {
  const date = new Date("2024-02-02, 08:00:00");

  const eventAkad = await new EventRepository().model.create({
    data: {
      name: "wedding",
      description: "The Wedding of",
      date,
      view_path: "web/event/akad/show-music.njk",
      view_data: {
        title: "The Wedding of",
        subtitle: "The Wedding of",
        description: format(date, "EEEE, d LLLL yyyy", {
          locale: idLocale,
        }),
        thumbnail_image_path: "logo-wide.png",
        thumbnail_image_width: 661,
        thumbnail_image_height: 452,
        thumbnail_image_mime_type: "image/png",
        logo_path: "logo-black.svg",
        akad_title: "Akad Nikah",
        reception_title: "Resepsi Pernikahan",
        reception_start_date: new Date("2024-02-02, 11:00:00"),
        reception_end_date: new Date("2024-02-02, 14:00:00"),
        bride: {
          nick_name: "",
          full_name: "",
          instagram_url: "https://www.instagram.com/",
          instagram_username: "",
          parent_description: "Putri pertama dari Bapak & Ibu",
        },
        groom: {
          nick_name: "",
          full_name: "",
          instagram_url: "https://www.instagram.com/",
          instagram_username: "",
          parent_description: "Putra pertama dari Bapak & Ibu",
        },
        wedding_gift: {
          banks: [
            {
              image_path: "img/bank/bca.png",
              name: "BCA",
              account_number: "",
              owner_name: "a/n ",
            },
          ],
        },
        location: {
          address: "",
          name: "",
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
          view_path: "web/event/akad/show-silent.njk",
          event: { connect: { id: eventAkad.id } },
        },
      },
    },
  });
}
