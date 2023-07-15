import { Document, Schema, model } from "mongoose";

// Type Defining
export interface IProduct extends Document {
  productName: string;
  productImage: string;
  productDescription: string;
  productCategory: string;
  productQuantity: number;
  productExpectedSale: number;
  productPrice: number;
  totalSoldQty: number;
}

const Product = new Schema<IProduct>({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productExpectedSale: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  totalSoldQty: {
    type: Number,
    required: true,
  },
});

export const ProductSchema = model<IProduct>("Product", Product);
