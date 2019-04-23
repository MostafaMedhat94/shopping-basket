import { Router } from "express";
import {
    create,
    getAll,
    getOne,
    updateQuantity,
    deleteOne,
} from "../../controllers/cart";
import { validate } from "../../validators/request";

const router: Router = Router();

router.get("/", getAll);
router.get("/:id(\\d+)/", getOne);
router.post("/", validate("addProductToShoppingCart"), create);
router.put(
    "/:id(\\d+)/",
    validate("updateShoppingCartProductQuantity"),
    updateQuantity,
);
router.delete("/:id(\\d+)/", deleteOne);

export default router;
