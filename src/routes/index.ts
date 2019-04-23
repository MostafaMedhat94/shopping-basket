import { Router, Request, Response, NextFunction } from "express";
import * as multer from "multer";

import productsRouter from "./apis/products";
import cartRouter from "./apis/cart";

const router: Router = Router();
const upload: multer.Instance = multer(); // Handle multi-part/form-data requests

router.get(
    "/",
    upload.none(),
    (req: Request, res: Response, next?: NextFunction) => {
        res.status(200).send("Welcome to our fancy home page");
    },
);

// Handle incoming products' requests
router.use("/products", productsRouter);

// Handle incoming shopping cart's requests
router.use("/cart", cartRouter);

export default router;
