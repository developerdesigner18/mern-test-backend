import { Document, Schema, model } from "mongoose";

interface IOrder extends Document {
  productID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
  quantity: number;
  purchaseDate: Date;
}

const Order = new Schema<IOrder>({
  productID: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
});

module.exports = model("Order", Order);
