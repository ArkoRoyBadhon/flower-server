"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flower = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const FlowerSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// export const Tutor = model<ITutor, Record<string,unknown>>('Tutor', TutorSchema)
exports.Flower = (0, mongoose_1.model)("Flower", FlowerSchema);
