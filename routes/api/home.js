import authenticate from "../../app/http/middleware/authenticate.js";
import { HomeController } from "../../app/http/controllers/api/HomeController.js";
import { Router } from "express";

const router = Router();

router.get("/app-version", authenticate, new HomeController().appVersion);

export default router;
