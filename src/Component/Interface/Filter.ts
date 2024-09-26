export interface ApiFilter {
  laptop: Item[];
  pc: Item[];
}

export interface Item {
  id: number;
  title: string;
  arrayFilter?: string[];
  filterNumber?: boolean;
}

export const apiFilter: ApiFilter = {
  laptop: [
    {
      id: 1,
      title: "Tình trạng sản phẩm",
      arrayFilter: ["Hiện sản phẩm hết hàng"],
    },
    {
      id: 2,
      title: "Giá",
      filterNumber: true,
    },
    {
      id: 3,
      title: "Hãng",
      arrayFilter: [
        "ASUS",
        "ACER",
        "MSI",
        "OPPO",

      ],
    },
    {
      id: 4,
      title: "Hãng",
      arrayFilter: ["ASUS", "ACER"],
    },
  ],
  pc: [
    {
      id: 1,
      title: "Tình trạng sản phẩm",
      arrayFilter: ["Hiện sản phẩm hết hàng"],
    },
    // {
    //   id: 2,
    //   title: "Giá",
    //   filterNumber: true,
    // },
    {
      id: 3,
      title: "Hãng",
      arrayFilter: ["ASUS,ACER"],
    },
  ],
};
