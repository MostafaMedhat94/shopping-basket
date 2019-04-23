import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/check";

import Cart from "../models/Cart";
import Product from "../models/Product.model";
import IProduct from "../interfaces/IProduct";

const cart = new Cart();

let decrementProductQuantity: (
    next: NextFunction,
) => (productId: number, orderQuantity: number) => void;

export const getAll = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(cart.products);
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    // Get errors from the previous validation function
    const errors = validationResult(req);

    // If there are any errors
    if (!errors.isEmpty()) {
        // Send them back and return
        return res.status(422).send({
            errors: errors
                .array()
                .map((error: { param: string; msg: string }) => `${error.msg}.`)
                .join(" "),
        });
    }

    // Get the product ID and order quantity
    const { product_id, product_quantity: orderQuantity } = req.body;

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
        const product: IProduct = storedProduct.toObject(); // convert product's document to plain JS object

        // Check if the product is in stock
        if (product.product_quantity === 0) {
            return res.status(400).send({
                message: "Unfortunately, your product is out of stock!",
            });
        }
        // Check if there's enough quantity to serve the order
        else if (product.product_quantity < orderQuantity) {
            return res.status(400).send({
                message: `There is only ${product.product_quantity} left of ${
                    product.product_name
                }`,
            });
        }

        // Set product's order quantity
        product.product_quantity = orderQuantity;

        // Add the product to the user's shopping cart
        cart.addProduct(product);

        // Decrement product's available quantity in the productsList
        decrementProductQuantity(next)(product.product_id, orderQuantity);

        return res.status(201).send(cart.products);
    });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
    // Get the product ID
    const productId = req.params.id;

    res.status(202).send(cart.deleteProduct(productId));
};

decrementProductQuantity = (next: NextFunction) => (
    productId: number,
    orderQuantity: number,
) => {
    Product.findOneAndUpdate(
        { product_id: productId },
        { $inc: { product_quantity: -orderQuantity } },
        (err, storedProduct) => {
            if (err) {
                return next(err);
            }
        },
    );
};
