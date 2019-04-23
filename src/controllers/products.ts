import { Request, Response, NextFunction } from "express";
import Product from "../models/Product.model";

export const create = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            product_id,
            product_name,
            product_price,
            product_quantity,
        } = req.body;

        const product = new Product({
            product_id,
            product_name,
            product_price,
            product_quantity,
        });

        product
            .save()
            .then(() =>
                res.status(201).send("Product was created successfully."),
            )
            .catch((err: Error) => next(err));
    } catch (err) {
        return next(err);
    }
};
