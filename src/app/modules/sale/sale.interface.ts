import { Types } from "mongoose";

export type ISale = {
  // _id?: Types.ObjectId
  quantity: number;
  seller_name: string;
  sell_date: Date;
  flower_name: string;
  flower_id: Types.ObjectId;
};

export type ISaleOption = {
  saleHistory: string;
};
