import { Router } from "express";

import {
    create,
    getAll,
    getOne,
    update,
    deleteOne,
} from "../../controllers/products";
import { validate } from "../../validators/request";

const router: Router = Router();

router.get("/", getAll);
router.get("/:id(\\d+)/", getOne);
router.get("/*", (req, res, next) => {
    res.status(404).send({ message: `${req.url} is not found!` });
});
router.post("/", validate("createProduct"), create);
router.put("/:id(\\d+)/", validate("updateProduct"), update);
router.delete("/:id(\\d+)/", deleteOne);

export default router;
