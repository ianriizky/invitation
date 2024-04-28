import { EventGuestController } from "../../app/http/controllers/web/EventGuestController.js";
import authenticateBasicMiddleware from "../../app/http/middleware/authenticate-basic.js";
import csrfMiddleware, { csrf } from "../../app/http/middleware/csrf.js";
import flashMiddleware from "../../app/http/middleware/flash.js";
import { EventGuestValidator } from "../../app/http/validators/web/EventGuestValidator.js";
import { asyncHandler } from "../../app/supports/helpers.js";
import { Router } from "express";

const router = Router();

router.get(
  "/event/:event_slug/guest",
  [
    authenticateBasicMiddleware(["admin", "default"]),
    new EventGuestValidator().index,
    csrf,
    csrfMiddleware,
    flashMiddleware,
  ],
  asyncHandler(new EventGuestController().index),
);
router.get(
  "/event/:event_slug/guest/create",
  [
    authenticateBasicMiddleware(["admin"]),
    new EventGuestValidator().create,
    csrf,
    csrfMiddleware,
    flashMiddleware,
  ],
  asyncHandler(new EventGuestController().create),
);
router.post(
  "/event/:event_slug/guest",
  [
    authenticateBasicMiddleware(["admin"]),
    new EventGuestValidator().create,
    new EventGuestValidator().store,
    csrf,
  ],
  asyncHandler(new EventGuestController().store),
);
router.get(
  "/event/:event_slug/guest/:guest_slug/edit",
  [
    authenticateBasicMiddleware(["admin"]),
    new EventGuestValidator().show,
    csrf,
    csrfMiddleware,
  ],
  asyncHandler(new EventGuestController().edit),
);
router.put(
  "/event/:event_slug/guest/:guest_slug",
  [
    authenticateBasicMiddleware(["admin"]),
    new EventGuestValidator().show,
    new EventGuestValidator().update,
    csrf,
  ],
  asyncHandler(new EventGuestController().update),
);
router.delete(
  "/event/:event_slug/guest/:guest_slug",
  [
    authenticateBasicMiddleware(["admin"]),
    new EventGuestValidator().show,
    csrf,
  ],
  asyncHandler(new EventGuestController().destroy),
);
router.get(
  "/event/:event_slug/:guest_slug",
  [new EventGuestValidator().show, csrf, csrfMiddleware],
  asyncHandler(new EventGuestController().show),
);
router.get(
  "/event/:event_slug/:guest_slug/whatsapp-message",
  [
    authenticateBasicMiddleware(["admin", "default"]),
    new EventGuestValidator().show,
  ],
  asyncHandler(new EventGuestController().showWhatsappMessage),
);
router.get(
  "/event/:event_slug/:guest_slug/text-message",
  [
    authenticateBasicMiddleware(["admin", "default"]),
    new EventGuestValidator().show,
  ],
  asyncHandler(new EventGuestController().showTextMessage),
);
router.get(
  "/event/:event_slug/:guest_slug/message",
  new EventGuestValidator().show,
  asyncHandler(new EventGuestController().getMessages),
);
router.post(
  "/event/:event_slug/:guest_slug/message",
  [new EventGuestValidator().show, new EventGuestValidator().postMessage, csrf],
  asyncHandler(new EventGuestController().postMessage),
);

export default router;
