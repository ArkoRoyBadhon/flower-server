import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/pagination";
import { saleFilterOptions } from "./sale.constant";
import { saleService } from "./sale.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await saleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sale created successfully!",
    data: result,
  });
});

const getAllSales = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, saleFilterOptions);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await saleService.getAllSales(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales retrieved successfully!",
    data: result,
  });
});

export const saleController = {
  insertIntoDB,
  getAllSales,
};
