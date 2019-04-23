import { Router } from "express";

import { create, getAll } from "../../controllers/products";
import { validate } from "../../validators/request";

const router: Router = Router();

router.get("/", getAll);
router.post("/", validate("createProduct"), create);

export default router;
