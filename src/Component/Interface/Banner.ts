import { Product } from "./Product";
import { ConfigSwiper } from "./Swiper";

export interface Banner {
  id: number;
  title: string;
  title_2: string;
  defaultURL: string;
  configBanner: ConfigSwiper;
  moreURL: { title: string; url: string }[];
  productList: Product[];
}

export interface BannerProps {
  data: Banner[];
}
