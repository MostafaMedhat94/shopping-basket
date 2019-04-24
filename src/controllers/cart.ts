import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/check";

import Cart from "../models/Cart";
import Product from "../models/Product.model";
import IProduct from "../interfaces/IProduct";

export const cart = new Cart();

let decrementProductQuantity: (
    next: NextFunction,
) => (productId: number, orderQuantity: number) => void;

export const getAll = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ products: cart.products, total: cart.total });
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    // Get errors from the previous middleware validation function
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

        // Check if the product is out of stock
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
        decrementProductQuantity(next)(product.product_id, -orderQuantity);

        // Return the shopping cart
        return res
            .status(201)
            .send({ products: cart.products, total: cart.total });
    });
};

export const getOne = (req: Request, res: Response, next: NextFunction) => {
    // Get the product ID
    const productId = req.params.id;

    // Get the product (if found)
    const cartProduct = cart.getProduct(productId);

    // If the product is not found in the shopping cart
    if (!cartProduct) {
        return res
            .status(422)
            .send({ message: "The product is not in your shopping cart!" });
    }

    // Otherwise, return the product
    return res.status(200).send(cartProduct);
};

export const updateQuantity = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Get errors from the previous middleware validation function
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

    // Get the product ID
    const productId = req.params.id;

    // Get the product (if found)
    const cartProduct = cart.getProduct(productId);

    // If the product is not found in the shopping cart
    if (!cartProduct) {
        return res
            .status(422)
            .send({ message: "The product is not in your shopping cart!" });
    }

    // Get the product's update quantity
    const { product_quantity: updateQuantity } = req.body;

    // Get the product from the productsList
    Product.findOne({ product_id: productId }, (err, storedProduct) => {
        if (err) {
            return next(err);
        }

        // Convert product's document to plain JS object
        const {
            product_quantity: storedProductQuantity, // Get the stored product's quantity
            product_name, // Get the stored product name
        } = storedProduct.toObject();

        // Check if the product is out of stock
        if (storedProductQuantity === 0) {
            return res.status(422).send({
                message: "Unfortunately, your product is out of stock!",
            });
        }
        // Check if there's enough quantity to serve the order
        else if (storedProductQuantity < updateQuantity) {
            return res.status(422).send({
                message: `There is only ${storedProductQuantity} left of ${product_name}`,
            });
        }

        // Calculate the difference between the cartProduct's quantity
        // and the update quantity
        const quantityDifference =
            cartProduct["product_quantity"] - updateQuantity;

        // Update the shopping cart's product quantity
        cart.updateProductQuantity(productId, updateQuantity);

        // Decrement product's available quantity in the productsList
        decrementProductQuantity(next)(productId, quantityDifference);

        // Return the shopping cart
        return res
            .status(202)
            .send({ products: cart.products, total: cart.total });
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
        { $inc: { product_quantity: orderQuantity } },
        (err, storedProduct) => {
            if (err) {
                return next(err);
            }
        },
    );
};
