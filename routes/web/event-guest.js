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
    authenticateBasicMiddleware,
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
    authenticateBasicMiddleware,
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
    authenticateBasicMiddleware,
    new EventGuestValidator().create,
    new EventGuestValidator().store,
    csrf,
  ],
  asyncHandler(new EventGuestController().store),
);
router.delete(
  "/event/:event_slug/guest/:guest_slug",
  [authenticateBasicMiddleware, new EventGuestValidator().show, csrf],
  asyncHandler(new EventGuestController().destroy),
);

export default router;
