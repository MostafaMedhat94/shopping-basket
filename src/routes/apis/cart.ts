import { Router } from "express";
import { create } from "../../controllers/cart";

const router: Router = Router();

router.post("/", create);

export default router;
