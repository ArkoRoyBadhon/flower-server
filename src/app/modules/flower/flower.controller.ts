import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { flowerService } from "./flower.service";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/pagination";
import { flowerFilterOptions } from "./flower.constant";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await flowerService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flower created successfully!",
    data: result,
  });
});

const getAllFlowers = catchAsync(async (req: Request, res: Response) => {
  console.log("query", req.query);
  console.log("params", req.params);

  const filters = pick(req.query, flowerFilterOptions);
  const paginationOptions = pick(req.query, paginationFields);

  console.log("filters", filters);
  console.log("pagination", paginationOptions);

  const result = await flowerService.getAllFlowers(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

export const flowerController = {
  insertIntoDB,
  getAllFlowers,
};
