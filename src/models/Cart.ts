import IProduct from "../interfaces/IProduct";

class Cart {
    private _products: Array<IProduct>;
    private _total: number;

    constructor() {
        this._products = [];
        this._total = 0;
    }

    public get products(): Array<IProduct> {
        return this._products;
    }

    public get total(): number {
        return this._total;
    }

    public addProduct = (product: IProduct): Array<IProduct> => {
        const productIndex = this._getProductIndex(product.product_id);

        // Check if the product was previously added to the shopping cart
        if (productIndex !== -1) {
            // If so, update the product quantity
            this._products[productIndex].product_quantity +=
                product.product_quantity;
        } else {
            // Otherwise, add the product to the shopping list
            this._products.push(product);
        }

        // Calculate the shopping list's total
        this._calculateTotal();

        // Return the shopping list
        return this._products;
    };

    public updateProductQuantity = (
        productId: number,
        productQuantity: number,
    ): Promise<string | IProduct> => {
        const productIndex = this._getProductIndex(productId);

        return new Promise<string | IProduct>((resolve, reject) => {
            // Check if the product is in the shopping list
            if (productIndex === -1) {
                // If, not ...
                reject("This product is not in your shopping list");
            }

            // If so, update the product's quantity
            this._products[productIndex].product_quantity = productQuantity;

            // Calculate the shopping list's total
            this._calculateTotal();

            resolve(this._products[productIndex]);
        });
    };

    public deleteProduct = (productId: number) => {
        // Get product index
        const productIndex = this._getProductIndex(productId);

        // Check if the product exists
        // If so,
        // Remove the product from the cart
        // and return the deleted product
        // Otherwise, return empty object
        return productIndex === -1
            ? {}
            : this._products.splice(productIndex, 1);
    };

    private _calculateTotal = () => {
        this._total = this._products
            .map((product) => product.product_price * product.product_quantity)
            .reduce((accum, current) => accum + current);
    };

    private _isAdded = (productId: number): boolean => {
        return !!this._products.find(
            (storedProduct) => storedProduct.product_id === +productId,
        );
    };

    private _getProductIndex = (productId: number): number =>
        this._products.findIndex((product) => product.product_id === productId);
}

export default Cart;
