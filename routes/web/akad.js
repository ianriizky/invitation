import { AkadController } from "../../app/http/controllers/web/AkadController.js";
import csrf from "../../app/http/middleware/csrf.js";
import { AkadValidator } from "../../app/http/validators/web/AkadValidator.js";
import { Router } from "express";

const router = Router();

router.get(
  "/akad/:slug",
  csrf,
  new AkadValidator().show,
  new AkadController().show,
);

export default router;
