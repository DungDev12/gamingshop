import { iconsSpec } from "@routes/config/iconProducts";

type IconSpecKeys = keyof typeof iconsSpec;

export interface SpecProduct {
  icon: IconSpecKeys;
  spec: string;
}

export interface Product {
  id: number;
  name: string;
  isStock?: boolean;
  image?: string;
  imageArray?: string[];
  isFavorite?: boolean;
  price: {
    discount: number;
    original: number;
    sale: number;
  };
  specProducts: SpecProduct[];
}
export interface ProductProps {
  item: Product;
}
