import config from "../../../../config/app.js";
import { NotFoundException } from "../../../exceptions/NotFoundException.js";
import { EventGuestRepository } from "../../../repositories/EventGuestRepository.js";
import { EventRepository } from "../../../repositories/EventRepository.js";
import { GuestRepository } from "../../../repositories/GuestRepository.js";
import { MessageRepository } from "../../../repositories/MessageRepository.js";
import { createFlash } from "../../middleware/flash.js";
import { EventGuestPresenter } from "../../presenters/EventGuestPresenter.js";
import { Controller } from "../Controller.js";
import { StatusCodes } from "http-status-codes";

export class EventGuestController extends Controller {
  /**
   * @template {import("../../validators/web/EventGuestValidator.js").IndexRequestQuery} RequestQuery
   * @param {import("express").Request<,,,RequestQuery>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async index(req, res, next) {
    const { event_slug } = req.params;
    const event = await new EventRepository().findBySlug(event_slug);

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    const paginated = await new EventGuestRepository().paginate(
      {
        number: req.query.page,
        url: `${config.url}/event/${event.slug}/guest`,
      },
      {
        where: {
          ...{ event: { id: event.id } },
          ...(req.query?.search && {
            guest: {
              OR: [
                { slug: { contains: req.query.search } },
                { name: { contains: req.query.search } },
                { domicile: { contains: req.query.search } },
                { phone_number: { contains: req.query.search } },
                { description: { contains: req.query.search } },
              ],
            },
          }),
        },
        include: { guest: true },
        orderBy: { created_at: "desc" },
      },
    );

    return res.render(
      "web/event-guest/index.njk",
      new EventGuestPresenter().index(paginated, event, req),
    );
  }

  /**
   * @template {import("../../validators/web/EventGuestValidator.js").CreateRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async create(req, res, next) {
    const { event_slug } = req.params;
    const event = await new EventRepository().findBySlug(event_slug);

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    const guests = await new GuestRepository().model.findMany({
      select: { slug: true, name: true },
      orderBy: { created_at: "desc" },
    });

    return res.render("web/event-guest/create.njk", {
      ...event.view_data,
      event_slug,
      guests,
      index_url: `${config.url}/event/${event.slug}/guest`,
      store_url: `${config.url}/event/${event.slug}/guest`,
    });
  }

  /**
   * @template {import("../../validators/web/EventGuestValidator.js").CreateRequestParam} RequestParam
   * @template {import("../../validators/web/EventGuestValidator.js").StoreRequestBody} RequestBody
   * @param {import("express").Request<RequestParam,,RequestBody>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async store(req, res, next) {
    const { event_slug } = req.params;
    const event = await new EventRepository().findBySlug(event_slug);

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    if (req.body["guest[name_select]"]) {
      await new EventGuestRepository().createByEvent(event, req.body);
    } else {
      await new GuestRepository().createByEvent(event, req.body);
    }

    createFlash(req, { color: "green", message: "Data berhasil dibuat." });

    return res.redirect(`${config.url}/event/${event_slug}/guest`);
  }

  /**
   * @template {import("../../validators/web/EventGuestValidator.js").ShowRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async show(req, res, next) {
    const { event_slug, guest_slug } = req.params;
    const event = await new EventRepository().findByGuestSlug(
      event_slug,
      guest_slug,
    );

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    return res.render(
      event.event_guests[0].current_view_path,
      new EventGuestPresenter().show(event, event.event_guests[0]),
    );
  }

  /**
   * @template {import("../../validators/web/EventGuestValidator.js").ShowRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async showWhatsappMessage(req, res, next) {
    const { event_slug, guest_slug } = req.params;
    const event = await new EventRepository().findByGuestSlug(
      event_slug,
      guest_slug,
    );

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    return res.redirect(
      EventRepository.getWhatsappMessageUrl(
        req.app.get("nunjucks"),
        event,
        event.event_guests[0].guest,
      ),
    );
  }

  /**
   * @template {import("../../validators/web/EventGuestValidator.js").ShowRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async getMessages(req, res, next) {
    const { event_slug } = req.params;
    const event = await new EventRepository().findBySlug(event_slug);

    if (!event || !event.view_data?.message_view_path) {
      throw new NotFoundException("Event view path is not found.");
    }

    const messages = await new MessageRepository().findManyByEventSlug(
      event_slug,
    );

    return res.render(event.view_data?.message_view_path, { messages });
  }

  /**
   * @template {import("../../validators/web/EventGuestValidator.js").ShowRequestParam} RequestParam
   * @template {import("../../validators/web/EventGuestValidator.js").PostMessageRequestBody} RequestBody
   * @param {import("express").Request<RequestParam,,RequestBody>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async postMessage(req, res, next) {
    const { event_slug, guest_slug } = req.params;
    const { presence_status, content } = req.body;

    const event = await new EventRepository().findByGuestSlug(
      event_slug,
      guest_slug,
    );

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    try {
      await new MessageRepository().upsertByEventGuest(event.event_guests[0], {
        presence_status,
        content,
      });

      return res.status(StatusCodes.CREATED).json({
        message: "Terima kasih atas doa dan ucapannya.",
        color: "green",
      });
    } catch (error) {
      return res.status(StatusCodes.CREATED).json({
        message: config.is_development
          ? error.message
          : "Maaf, telah terjadi kesalahan teknis.",
        color: "red",
      });
    }
  }

  /**
   * @template {import("../../validators/web/EventGuestValidator.js").ShowRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async destroy(req, res, next) {
    const { event_slug, guest_slug } = req.params;
    const event = await new EventRepository().findByGuestSlug(
      event_slug,
      guest_slug,
    );

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    await new GuestRepository().model.delete({
      where: { slug: guest_slug },
    });

    createFlash(req, { color: "green", message: "Data berhasil dihapus." });

    return res.redirect(`${config.url}/event/${event_slug}/guest`);
  }
}
