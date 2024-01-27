import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/pagination";
import { saleFilterOptions } from "./sale.constant";
import { saleService } from "./sale.service";

const getAllSales = catchAsync(async (req: Request, res: Response) => {
  console.log("query", req.query);
  console.log("params", req.params);

  const filters = pick(req.query, saleFilterOptions);
  const paginationOptions = pick(req.query, paginationFields);

  console.log("filters", filters);
  console.log("pagination", paginationOptions);

  const result = await saleService.getAllSales(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales retrieved successfully!",
    data: result,
  });
});

export const saleController = {
  getAllSales,
};
