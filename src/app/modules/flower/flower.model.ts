/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IFlower } from "./flower.interface";

const FlowerSchema = new Schema<IFlower>(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    bloom_date: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
      enum: ["small", "medium", "large"],
    },
    fragrance: {
      type: String,
      required: true,
      enum: [
        "rose-scented",
        "mild",
        "sweet",
        "none",
        "floral",
        "earthy",
        "orchid-scented",
        "light",
        "fruty",
      ],
    },
    occation: {
      type: String,
      required: true,
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
export const Flower = model<IFlower>("Flower", FlowerSchema);
