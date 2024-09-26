import { Product } from "./Product";

export enum SwiperType {
  Product = "PRODUCT",
  Banner = "BANNER",
}

export interface ConfigSwiper {
  loop?: boolean;
  arrows?: boolean;
  dynamicBullets?: boolean;
  autoplay?: boolean;
  setTimeAutoplay?: number;
  disableOnInteraction?: boolean;
  effect?: string;
  clickable?: boolean;
  spaceBetween?: number;
  centeredSlides?: boolean;
  freeMode?: boolean;
  sizePreview?: number;
  disableOnInteractionAutoplay?: boolean;
}

export interface SwiperTypeProps {
  w?: number;
  h?: number;
  openWith?: string;
  image?: string[];
  config: ConfigSwiper;
  productList?: Product[];
}
