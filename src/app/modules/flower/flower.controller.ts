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
  const filters = pick(req.query, flowerFilterOptions);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await flowerService.getAllFlowers(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

const updateFlower = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  // console.log("id", id, "data", payload);

  const result = await flowerService.updateFlower(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flower Updated successfully!",
    data: result,
  });
});

const deleteFlower = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("del", id);

  const result = await flowerService.deleteFlower(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flower Deleted successfully!",
    data: result,
  });
});

export const flowerController = {
  insertIntoDB,
  getAllFlowers,
  updateFlower,
  deleteFlower,
};
