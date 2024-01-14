import config from "../../../../config/app.js";
import { NotFoundException } from "../../../exceptions/NotFoundException.js";
import { EventRepository } from "../../../repositories/EventRepository.js";
import { MessageRepository } from "../../../repositories/MessageRepository.js";
import { EventPresenter } from "../../presenters/EventPresenter.js";
import { Controller } from "../Controller.js";
import { StatusCodes } from "http-status-codes";

export class EventController extends Controller {
  /**
   * @template {import("../../validators/web/EventValidator.js").ShowRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async show(req, res, next) {
    const { event_slug, guest_slug } = req.params;
    const event = await new EventRepository().findBySlug(
      event_slug,
      guest_slug,
    );

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    return res.render(
      event.event_guests[0].current_view_path,
      new EventPresenter().show(event),
    );
  }

  /**
   * @template {import("../../validators/web/EventValidator.js").ShowRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async getMessages(req, res, next) {
    const { event_slug } = req.params;
    const messages = await new MessageRepository().findManyByEventSlug(
      event_slug,
    );

    return res.render("web/event/akad/message.njk", { messages });
  }

  /**
   * @template {import("../../validators/web/EventValidator.js").ShowRequestParam} RequestParam
   * @template {import("../../validators/web/EventValidator.js").PostMessageRequestBody} RequestBody
   * @param {import("express").Request<RequestParam,,RequestBody>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async postMessage(req, res, next) {
    const { event_slug, guest_slug } = req.params;
    const { presence_status, content } = req.body;

    const event = await new EventRepository().findBySlug(
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
   * @template {import("../../validators/web/EventValidator.js").ShowRequestParam} RequestParam
   * @param {import("express").Request<RequestParam>} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  async message(req, res, next) {
    const { event_slug, guest_slug } = req.params;
    const event = await new EventRepository().findBySlug(
      event_slug,
      guest_slug,
    );

    if (event === null) {
      throw new NotFoundException("Event not found.");
    }

    const url = EventRepository.getWhatsappMessageLink(
      req.app.get("nunjucks"),
      event,
      event.event_guests[0].guest,
    );

    return res.send(`<a href="${url}" target="_blank">klik</a>`);
  }
}
