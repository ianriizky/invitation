import event from "./event.js";
import express from "express";

const router = express.Router();

router.use(event);

export default router;
