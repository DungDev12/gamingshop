import { iconsSpec } from "@routes/config/iconProducts";

type IconSpecKeys = keyof typeof iconsSpec;

export interface SpecProduct {
  name: IconSpecKeys;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  details: {
    images: string[];
    configurations: SpecProduct[];
  };
  originalPrice: number;
  point: number;
  isFavorite: boolean;
  discount: number;
  price: number;
  image: string;
  rating: number;
  stock: number;
}
export interface ProductProps {
  item: Product;
}
