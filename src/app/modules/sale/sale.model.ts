/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { ISale } from "./sale.interface";
import { Flower } from "../flower/flower.model";

const SaleSchema = new Schema<ISale>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    seller_name: {
      type: String,
      required: true,
    },
    sell_date: {
      type: Date,
      required: true,
    },
    flower_name: {
      type: String,
      required: true,
    },
    flower_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Flower,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// export const Tutor = model<ITutor, Record<string,unknown>>('Tutor', TutorSchema)
export const Sale = model<ISale>("Sale", SaleSchema);
