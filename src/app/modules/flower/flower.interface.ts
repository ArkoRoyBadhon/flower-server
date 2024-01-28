export type IFlower = {
  // _id?: Types.ObjectId
  name: string;
  img: string;
  price: number;
  quantity: number;
  bloom_date: string;
  color: string;
  type: string;
  size: string;
  fragrance: string;
  occation: string;
};

export type IOption = {
  searchTerm?: string | undefined;
  name?: string;
  price?: number;
  bloom_date?: string;
  color?: string[];
  size?: string;
  fragrance?: string[];
  occation?: string[];
  minPrice?: number;
  maxPrice?: number;
};
