import event from "./event.js";
import eventGuest from "./event-guest.js";
import express from "express";

const router = express.Router();

router.use(eventGuest);
router.use(event);

export default router;
