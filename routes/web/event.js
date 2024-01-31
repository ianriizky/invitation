import { EventController } from "../../app/http/controllers/web/EventController.js";
import { EventGuestController } from "../../app/http/controllers/web/EventGuestController.js";
import authenticateBasicMiddleware from "../../app/http/middleware/authenticate-basic.js";
import csrfMiddleware, { csrf } from "../../app/http/middleware/csrf.js";
import flashMiddleware from "../../app/http/middleware/flash.js";
import { EventGuestValidator } from "../../app/http/validators/web/EventGuestValidator.js";
import { EventValidator } from "../../app/http/validators/web/EventValidator.js";
import { asyncHandler } from "../../app/supports/helpers.js";
import { Router } from "express";

const router = Router();

router.get(
  "/event/:event_slug/guest",
  [
    authenticateBasicMiddleware,
    new EventGuestValidator().index,
    csrf,
    csrfMiddleware,
    flashMiddleware,
  ],
  new EventGuestController().index,
);
router.get(
  "/event/:event_slug/guest/create",
  [
    authenticateBasicMiddleware,
    new EventGuestValidator().create,
    csrf,
    csrfMiddleware,
    flashMiddleware,
  ],
  new EventGuestController().create,
);
router.post(
  "/event/:event_slug/guest",
  [
    authenticateBasicMiddleware,
    new EventGuestValidator().create,
    new EventGuestValidator().store,
    csrf,
  ],
  new EventGuestController().store,
);
router.delete(
  "/event/:event_slug/guest/:guest_slug",
  [authenticateBasicMiddleware, new EventGuestValidator().show, csrf],
  new EventGuestController().destroy,
);

router.get(
  "/event/:event_slug/:guest_slug",
  [new EventValidator().show, csrf, csrfMiddleware],
  asyncHandler(new EventController().show),
);
router.get(
  "/event/:event_slug/:guest_slug/whatsapp-message",
  [authenticateBasicMiddleware, new EventValidator().show],
  asyncHandler(new EventController().showWhatsappMessage),
);
router.get(
  "/event/:event_slug/:guest_slug/message",
  new EventValidator().show,
  asyncHandler(new EventController().getMessages),
);
router.post(
  "/event/:event_slug/:guest_slug/message",
  [new EventValidator().show, new EventValidator().postMessage, csrf],
  asyncHandler(new EventController().postMessage),
);

export default router;
