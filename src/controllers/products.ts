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
