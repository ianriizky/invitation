import { EventController } from "../../app/http/controllers/web/EventController.js";
import { EventValidator } from "../../app/http/validators/web/EventValidator.js";
import { asyncHandler } from "../../app/supports/helpers.js";
import { Router } from "express";

const router = Router();

router.get(
  "/event/:event_slug/:guest_slug",
  new EventValidator().show,
  asyncHandler(new EventController().show),
);

export default router;
