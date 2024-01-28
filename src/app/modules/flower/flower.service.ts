/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { IFlower, IOption } from "./flower.interface";
import { Flower } from "./flower.model";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationsHelpers } from "../../../helpers/paginationHelpers";

const insertIntoDB = async (data: IFlower): Promise<IFlower | null> => {
  const result = await Flower.create(data);
  return result;
};

const getAllFlowers = async (
  filters: Partial<IOption>,
  paginationOptions: {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: SortOrder | undefined;
  },
): Promise<IGenericResponse<IFlower[]> | null> => {
  // console.log('aa', )
  const andConditions: string | any[] = [];
  const { searchTerm, ...filtersData } = filters;
  const flowerSearchableFields = ["name", "color", "fragrance", "size"];

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

    const { page, limit, skip, sortBy, sortOrder } =
      paginationsHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Flower.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const count = await Flower.find({}).countDocuments();

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

const updateFlower = async (
  id: string,
  payload: Partial<IFlower>,
): Promise<Partial<IFlower> | null> => {
  const { flowerData }: any = payload;

  const result = await Flower.findByIdAndUpdate(id, flowerData, { new: true });

  return result;
};

const deleteFlower = async (id: string) => {
  try {
    const result = await Flower.findByIdAndDelete(id);

    return result;
  } catch (error) {
    return "Something went wrong";
  }
};

export const flowerService = {
  insertIntoDB,
  getAllFlowers,
  updateFlower,
  deleteFlower,
};
