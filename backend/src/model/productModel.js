import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, immutable: true } // Immutable field
  },
  {
    timestamps: true,
    collection: "products",
    versionKey: false,
  }
);

const ProductModel = mongoose.model("products", ProductSchema)

export default ProductModel;
