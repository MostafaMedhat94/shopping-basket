import { Request, Response, NextFunction } from "express";

import Cart from "../models/Cart";
import Product from "../models/Product.model";

const cart = new Cart();

export const create = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            product_id,
            product_name,
            product_price,
            product_quantity,
        } = req.body;

        Product.findOne({ product_id }, (err, product) => {
            if (err) {
                return next(err);
            }

            if (!product) {
                return res.status(400).send({
                    message:
                        "You can only add products available in the Products List!",
                });
            }

            const cartProducts = cart.addProduct({
                product_id,
                product_name,
                product_price,
                product_quantity,
            });

            return res.status(201).send(cartProducts);
        });
    } catch (error) {
        return next(error);
    }
};
