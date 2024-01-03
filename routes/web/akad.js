import { AkadController } from "../../app/http/controllers/web/AkadController.js";
import { Router } from "express";

const router = Router();

router.get("/akad", new AkadController().show);

export default router;
