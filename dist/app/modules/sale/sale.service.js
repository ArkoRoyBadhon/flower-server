"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleService = void 0;
const sale_model_1 = require("./sale.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const date_fns_1 = require("date-fns");
const flower_model_1 = require("../flower/flower.model");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { flower_id } = data;
    const flowerData = yield flower_model_1.Flower.findById(flower_id);
    const flowerName = (flowerData === null || flowerData === void 0 ? void 0 : flowerData.name) || "N/A";
    const info = Object.assign(Object.assign({}, data), { flower_name: flowerName });
    const result = yield sale_model_1.Sale.create(info);
    return result;
});
const getAllSales = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { saleHistory } = filters;
    try {
        const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationsHelpers.calculatePagination(paginationOptions);
        const sortConditions = {};
        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
        }
        const condition = {};
        if (saleHistory === "weekly") {
            condition.sell_date = {
                $gte: (0, date_fns_1.subDays)(new Date(), 7),
                $lte: new Date(),
            };
        }
        else if (saleHistory === "daily") {
            condition.sell_date = {
                $gte: (0, date_fns_1.subDays)(new Date(), 1),
                $lte: new Date(),
            };
        }
        else if (saleHistory === "monthly") {
            condition.sell_date = {
                $gte: (0, date_fns_1.subDays)(new Date(), 30),
                $lte: new Date(),
            };
        }
        else if (saleHistory === "yearly") {
            condition.sell_date = {
                $gte: (0, date_fns_1.subDays)(new Date(), 365),
                $lte: new Date(),
            };
        }
        const result = yield sale_model_1.Sale.find(condition)
            .populate("flower_id")
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const count = yield sale_model_1.Sale.find({}).countDocuments();
        return {
            meta: {
                page,
                limit,
                count,
            },
            data: result,
        };
    }
    catch (error) {
        // Handle errors
        console.error("Error occurred:", error);
        return null;
    }
});
exports.saleService = {
    insertIntoDB,
    getAllSales,
};
