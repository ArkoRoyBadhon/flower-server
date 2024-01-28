"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const flower_model_1 = require("../flower/flower.model");
const SaleSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: flower_model_1.Flower,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// export const Tutor = model<ITutor, Record<string,unknown>>('Tutor', TutorSchema)
exports.Sale = (0, mongoose_1.model)("Sale", SaleSchema);
