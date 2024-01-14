import { EventController } from "../../app/http/controllers/web/EventController.js";
import csrfMiddleware, { csrf } from "../../app/http/middleware/csrf.js";
import { EventValidator } from "../../app/http/validators/web/EventValidator.js";
import { asyncHandler } from "../../app/supports/helpers.js";
import { Router } from "express";

const router = Router();

router.get(
  "/event/:event_slug/:guest_slug",
  [new EventValidator().show, csrf, csrfMiddleware],
  asyncHandler(new EventController().show),
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
router.get(
  "/event/:event_slug/:guest_slug/whatsapp-message",
  new EventValidator().show,
  asyncHandler(new EventController().message),
);

export default router;
