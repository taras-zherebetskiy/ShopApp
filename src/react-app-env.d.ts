// <reference types=react-scripts />

type ProductCommets = {
  id: number,
  productId: number,
  description: string,
  date: string,
};

type Product = {
  id: number,
  imageUrl: string
  name: string,
  count: number,
  size: {
    width: number,
    height: number
  },
  weight: string,
  comments: string[]
};
