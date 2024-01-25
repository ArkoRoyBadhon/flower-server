export type IFlower = {
  // _id?: Types.ObjectId
  name: string;
  img: string;
  price: string;
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
  price?: string;
  bloom_date?: string;
  color?: string[];
  size?: string;
  fragrance?: string[];
  occation?: string[];
};
