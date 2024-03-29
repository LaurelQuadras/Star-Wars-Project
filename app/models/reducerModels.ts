import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";

export type PlanetStoreInfo = {
  id: number;
  name: string;
};

export type SortOptionStoreInfo = {
  sortField: string;
  sortDirection: TableHeaderSortOptions;
};

export type PlanetReducerType = {
  favoriteList: PlanetStoreInfo[];
  sortOption: SortOptionStoreInfo;
};
