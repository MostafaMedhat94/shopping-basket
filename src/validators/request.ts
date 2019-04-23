import { body } from "express-validator/check";

export const validate = (method: string) => {
    switch (method) {
        case "createProduct": {
            return [
                body("product_id", "A product must have an ID")
                    .exists()
                    .isInt(),
                body("product_name", "You must specify the product's name")
                    .exists()
                    .isString(),
                body("product_price", "You must specify the product's price")
                    .exists()
                    .isNumeric(),
                body(
                    "product_quantity",
                    "You must specify the product's quantity",
                )
                    .exists()
                    .isNumeric(),
            ];
        }
        case "updateProduct": {
            return [
                body("product_name", "You must specify the product's name")
                    .optional()
                    .isString(),
                body("product_price", "You must specify the product's price")
                    .optional()
                    .isNumeric(),
                body(
                    "product_quantity",
                    "You must specify the product's quantity",
                )
                    .optional()
                    .isNumeric(),
            ];
        }
        case "addProductToCart": {
            return [
                body("product_id", "You must specify the product's ID")
                    .exists()
                    .isInt(),
                body(
                    "product_quantity",
                    "You must specify the product's quantity",
                )
                    .exists()
                    .isNumeric(),
            ];
        }
    }
};
