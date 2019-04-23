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

    public updateProduct = (
        productId: number,
        update: {
            product_name?: string;
            product_price?: number;
            product_quantity?: number;
        },
    ) => {
        const productIndex = this._getProductIndex(productId);

        // Check if the product is in the shopping list
        if (productIndex === -1) {
            // If, not ...
            return {};
        }

        // If so, update the product's attributes
        for (let key in update) {
            if (key === "product_quantity") {
                // Check if the product's available quantity
                // is less than the order quantity
                if (update[key] < this._products[productIndex][key]) {
                    // If so, set the order quantity equals the product's available quantity
                    this._products[productIndex][key] = update[key];
                }
                // Otherwise, go to next iteration
                continue;
            }
            this._products[productIndex][key] = update[key];
        }

        // Calculate the shopping list's total
        this._calculateTotal();

        // Return the updated product
        return this._products[productIndex];
    };

    public deleteProduct = (productId: number) => {
        // Get product index
        const productIndex = this._getProductIndex(productId);

        // Check if the product exists
        // If it doesn't exist
        if (productIndex === -1) {
            return {};
        }

        // If so,
        // Remove the product from the cart
        const removedProduct = this._products.splice(productIndex, 1);

        // Recalculate cart's total
        this._calculateTotal();

        // Return the deleted product
        return removedProduct;
    };

    private _calculateTotal = () => {
        this._total = this._products
            .map((product) => product.product_price * product.product_quantity)
            .reduce((accum, current) => accum + current);
    };

    // private _isAdded = (productId: number): boolean => {
    //     return !!this._products.find(
    //         (storedProduct) => storedProduct.product_id === +productId,
    //     );
    // };

    private _getProductIndex = (productId: number): number =>
        this._products.findIndex((product) => product.product_id === productId);
}

export default Cart;
