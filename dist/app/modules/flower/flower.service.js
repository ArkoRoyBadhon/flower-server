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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowerService = void 0;
const flower_model_1 = require("./flower.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const date_fns_1 = require("date-fns");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield flower_model_1.Flower.create(data);
    return result;
});
const getAllFlowers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log('aa', )
    const andConditions = [];
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const flowerSearchableFields = ["name", "color", "fragrance", "size"];
    const AAAA = filtersData.bloom_date && (0, date_fns_1.endOfDay)(filtersData.bloom_date);
    if (filtersData.bloom_date) {
        filtersData.bloom_date = (_a = new Date(AAAA)) === null || _a === void 0 ? void 0 : _a.toISOString().split("T")[0];
    }
    try {
        if (searchTerm) {
            andConditions.push({
                $or: flowerSearchableFields.map((field) => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                })),
            });
        }
        // if(filtersData!.length > 0) {
        if (Object.keys(filtersData).length) {
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }
        // }
        if (minPrice !== undefined && maxPrice !== undefined) {
            andConditions.push({
                price: {
                    $gte: minPrice,
                    $lte: maxPrice,
                },
            });
        }
        else if (minPrice !== undefined) {
            andConditions.push({
                price: { $gte: minPrice },
            });
        }
        else if (maxPrice !== undefined) {
            andConditions.push({
                price: { $lte: maxPrice },
            });
        }
        const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationsHelpers.calculatePagination(paginationOptions);
        const sortConditions = {};
        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
        }
        const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
        const result = yield flower_model_1.Flower.find(whereConditions)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const count = yield flower_model_1.Flower.find(whereConditions).countDocuments();
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
const updateFlower = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { flowerData } = payload;
    const result = yield flower_model_1.Flower.findByIdAndUpdate(id, flowerData, { new: true });
    return result;
});
const deleteFlower = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("delete", id);
    try {
        const result = yield flower_model_1.Flower.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        return "Something went wrong";
    }
});
exports.flowerService = {
    insertIntoDB,
    getAllFlowers,
    updateFlower,
    deleteFlower,
};
