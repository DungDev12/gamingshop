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
