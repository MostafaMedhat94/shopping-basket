import { Router } from "express";
import { create } from "../../controllers/products";

const router: Router = Router();

router.post("/", create);

export default router;
