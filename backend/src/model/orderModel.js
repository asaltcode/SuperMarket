import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    // orderDate: { type: Date, default: Date.now },
    orderAmount: { type: Number, default: 0 },
    customerName: { type: String, default : "" },
    items: {type: Array, default: []}
  },
  {
    timestamps: true,
    collection: "order",
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", OrderSchema)

export default OrderModel;
