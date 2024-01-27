/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { ISale, ISaleOption } from "./sale.interface";
import { Sale } from "./sale.model";
import { paginationsHelpers } from "../../../helpers/paginationHelpers";

const getAllSales = async (
  filters: Partial<ISaleOption>,
  paginationOptions: {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: SortOrder | undefined;
  },
): Promise<IGenericResponse<ISale[]> | null> => {
  // console.log('aa', )
  const { sell_date } = filters;

  try {
    const { page, limit, skip, sortBy, sortOrder } =
      paginationsHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }

    const result = await Sale.find({ sell_date })
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
  getAllSales,
};
