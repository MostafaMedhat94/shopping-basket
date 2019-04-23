import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/check";

import Product from "../models/Product.model";

export const getAll = (req: Request, res: Response, next: NextFunction) => {
    Product.find({})
        .then((products) => res.status(200).send(products))
        .catch((err) => next(err));
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    // Get errors from the previous validation function
    const errors = validationResult(req);

    // If there is any
    if (!errors.isEmpty()) {
        // Send them back and return
        return res.status(422).send({
            errors: errors
                .array()
                .map((error: { param: string; msg: string }) => `${error.msg}.`)
                .join(" "),
        });
    }

    // Otherwise, create the product
    Product.create({
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity,
    })
        .then((product) => res.status(201).send(product))
        .catch((err: Error) => next(err));
};

export const getOne = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;

    Product.findOne({ product_id: productId }, (err, product) => {
        if (err) return next(err);

        if (!product) {
            return res.status(404).send({
                message: "Cannot find any product matching the specified ID",
            });
        }

        return res.status(200).send(product);
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const update = req.body;

    Product.findOneAndUpdate(
        { product_id: productId },
        update,
        { new: true },
        (err, product) => {
            if (err) return next(err);

            if (!product) {
                return res.status(404).send({
                    message:
                        "Cannot find any product matching the specified ID",
                });
            }

            return res.status(200).send(product);
        },
    );
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;

    Product.findOneAndRemove({ product_id: productId }, (err, doc) => {
        if (err) return next(err);

        if (!doc) {
            return res.status(404).send({
                message: "Cannot find any product matching the specified ID",
            });
        }

        return res.status(202).send(doc);
    });
};
