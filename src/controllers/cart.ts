import { Request, Response, NextFunction } from "express";

import Cart from "../models/Cart";
import Product from "../models/Product.model";

const cart = new Cart();

export const getAll = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(cart.products);
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product_id, product_quantity } = req.body;

        // Check for product existence in the productsList
        Product.findOne({ product_id }, (err, storedProduct) => {
            if (err) {
                return next(err);
            }

            // If the product is not the productsList
            if (!storedProduct) {
                return res.status(400).send({
                    message:
                        "You can only add products available in the Products List!",
                });
            }

            // Otherwise, get the product
            const product = storedProduct.toObject();

            // Update its quantity
            product.product_quantity = product_quantity;

            // Add the product to the user's shopping cart
            cart.addProduct(product);

            return res.status(201).send(product);
        });
    } catch (error) {
        return next(error);
    }
};
