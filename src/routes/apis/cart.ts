import { Router } from "express";
import { create, getAll, deleteOne } from "../../controllers/cart";
import { validate } from "../../validators/request";

const router: Router = Router();

router.get("/", getAll);
router.post("/", validate("addProductToCart"), create);
router.delete("/:id(\\d+)/", deleteOne);

export default router;
