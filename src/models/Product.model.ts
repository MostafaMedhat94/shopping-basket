import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";
import Mongoose from "../../db/mongoose";

const { mongoose } = new Mongoose();

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true,
    },
    product_name: {
        type: String,
        required: true,
        unique: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
});

// Activate autoIncrementPlugin on Product's model
ProductSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName: "Product",
});

// Create Product Model
const Product = mongoose.model("ProductsList", ProductSchema);

export default Product;
