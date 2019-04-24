// ===========================================================
/**
 * @api {get} /api/v1/cart
 * @apiName GetCart
 * @apiGroup Cart
 *
 *
 * @apiSuccess {Array} products - Shopping Cart Products.
 * @apiSuccess {Number} total - Shopping Cart Total.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "products": [{
            "_id": 10,
            "product_id": "42",
            "product_name": "Watermelon",
            "product_price": 35,
            "product_quantity": 8,
            "__v": 0
        }],
 *       "total": 280
 *     }
 *
 */
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ===========================================================
/**
 * @api {get} /api/v1/cart/:id
 * @apiName GetCartProduct
 * @apiGroup Cart
 *
 *
 * @apiSuccess {Number} product_id - Shopping Cart Product ID.
 * @apiSuccess {String} product_name - Shopping Cart Product name.
 * @apiSuccess {Number} product_price - Shopping Cart Product price.
 * @apiSuccess {Number} product_quantity - Shopping Cart Product Quantity.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "product_id": "42",
        "product_name": "Watermelon",
        "product_price": 35,
        "product_quantity": 2,
 *     }

 * @apiError The product is not in your shopping cart!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "message": "The product is not in your shopping cart!"
 *     }
 *
 */
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ===========================================================
/**
 * @api {post} /api/v1/cart
 * @apiName AddCartProduct
 * @apiGroup Cart
 *
 * @apiParam {Number} product_id          Mandatory Unique Product ID.
 * @apiParam {Number} product_quantity    Mandatory Product Quantity.
 * 
 * @apiSuccess {Array} products - Shopping Cart Products.
 * @apiSuccess {Number} total - Shopping Cart Total.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "product_id": 42,
 *       "product_quantity": 8
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "products": [{
            "_id": 10,
            "product_id": "42",
            "product_name": "Watermelon",
            "product_price": 35,
            "product_quantity": 8,
            "__v": 0
        }],
 *       "total": 280
 *     }
 *

 * @apiError You must specify the product's ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "message": "You must specify the product's ID"
 *     }
 * 
 * @apiError You must specify the product's quantity.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "message": "You must specify the product's quantity"
 *     }
 *
 * 
 * @apiError You can only add products available in the Products List!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "You can only add products available in the Products List!"
 *     }
 * 
 * @apiError Unfortunately, your product is out of stock!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "Unfortunately, your product is out of stock!"
 *     }
 *
 * 
 * @apiError There is only ${product_quantity} left of ${product_name}.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "There is only ${product_quantity} left of ${product_name}"
 *     }
 */
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ===========================================================
/**
 * @api {put} /api/v1/cart/:id
 * @apiName UpdateCartProductQuantity
 * @apiGroup Cart
 *
 * @apiParam {Number} product_id          Mandatory Unique Product ID.
 * @apiParam {Number} product_quantity    Mandatory Product Quantity.
 * 
 * @apiSuccess {Array} products - Shopping Cart Products.
 * @apiSuccess {Number} total - Shopping Cart Total.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "product_quantity": 8
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 202 ACCEPTED
 *     {
 *       "products": [{
            "_id": 10,
            "product_id": "42",
            "product_name": "Watermelon",
            "product_price": 35,
            "product_quantity": 8,
            "__v": 0
        }],
 *       "total": 280
 *     }
 *

 * @apiError You must specify the product's quantity.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "message": "You must specify the product's quantity"
 *     }
 *
 * 
 * @apiError The product is not in your shopping cart!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "message": "The product is not in your shopping cart!"
 *     }
 * 
 * @apiError Unfortunately, your product is out of stock!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "Unfortunately, your product is out of stock!"
 *     }
 *
 * 
 * @apiError There is only ${product_quantity} left of ${product_name}.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "There is only ${product_quantity} left of ${product_name}"
 *     }
 */
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ===========================================================
/**
 * @api {delete} /api/v1/cart/:id
 * @apiName DeleteCartProduct
 * @apiGroup Cart
 *
 * @apiParam {Number} product_id   Mandatory Unique Product ID.
 * 
 * @apiSuccess {Number} product_id - Shopping Cart's Deleted Product ID.
 * @apiSuccess {String} product_name - Shopping Cart's Deleted Product name.
 * @apiSuccess {Number} product_price - Shopping Cart's Deleted Product price.
 * @apiSuccess {Number} product_quantity - Shopping Cart's Deleted Product Quantity.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 202 ACCEPTED
 *     {
 *      "product_id": "42",
        "product_name": "Watermelon",
        "product_price": 35,
        "product_quantity": 2,
 *     }

 */
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
