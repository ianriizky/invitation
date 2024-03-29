import config from "../../../../config/app.js";
import { NotFoundException } from "../../../exceptions/NotFoundException.js";
import { EventRepository } from "../../../repositories/EventRepository.js";
import { GuestRepository } from "../../../repositories/GuestRepository.js";
import { createFlash } from "../../middleware/flash.js";
import { EventGuestPresenter } from "../../presenters/EventGuestPresenter.js";
import { Controller } from "../Controller.js";

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

    const paginated = await new GuestRepository().paginate(
      { number: req.query.page },
      {
        where: { event_guests: { some: { event: { id: event.id } } } },
        include: { event_guests: { where: { event: { id: event.id } } } },
        orderBy: { created_at: "desc" },
      },
    );

    return res.render(
      "web/event-guest/index.njk",
      new EventGuestPresenter().index(paginated, event),
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

    return res.render("web/event-guest/create.njk", {
      event_slug,
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

    await new GuestRepository().createByEvent(event, req.body);
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
