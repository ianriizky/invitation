import eventGuest from "./event-guest.js";
import express from "express";

const router = express.Router();

router.use(eventGuest);

export default router;
