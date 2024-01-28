/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { ISale, ISaleOption } from "./sale.interface";
import { Sale } from "./sale.model";
import { paginationsHelpers } from "../../../helpers/paginationHelpers";
import { subDays } from "date-fns";
import { Flower } from "../flower/flower.model";

const insertIntoDB = async (data: ISale): Promise<ISale | null> => {
  const { flower_id } = data;

  const flowerData = await Flower.findById(flower_id);

  const flowerName = flowerData?.name || "N/A";

  const info = {
    ...data,
    flower_name: flowerName,
  };

  const result = await Sale.create(info);
  return result;
};

const getAllSales = async (
  filters: Partial<ISaleOption>,
  paginationOptions: {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: SortOrder | undefined;
  },
): Promise<IGenericResponse<ISale[]> | null> => {
  const { saleHistory } = filters;

  try {
    const { page, limit, skip, sortBy, sortOrder } =
      paginationsHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }

    const condition: any = {};

    if (saleHistory === "weekly") {
      condition.sell_date = {
        $gte: subDays(new Date(), 7),
        $lte: new Date(),
      };
    } else if (saleHistory === "daily") {
      condition.sell_date = {
        $gte: subDays(new Date(), 1),
        $lte: new Date(),
      };
    } else if (saleHistory === "monthly") {
      condition.sell_date = {
        $gte: subDays(new Date(), 30),
        $lte: new Date(),
      };
    } else if (saleHistory === "yearly") {
      condition.sell_date = {
        $gte: subDays(new Date(), 365),
        $lte: new Date(),
      };
    }

    const result = await Sale.find(condition)
      .populate("flower_id")
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const count = await Sale.find({}).countDocuments();

    return {
      meta: {
        page,
        limit,
        count,
      },
      data: result,
    };
  } catch (error) {
    // Handle errors
    console.error("Error occurred:", error);
    return null;
  }
};

export const saleService = {
  insertIntoDB,
  getAllSales,
};
