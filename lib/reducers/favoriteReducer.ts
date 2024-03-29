import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";

export type PlanetStoreInfo = {
  id: number;
  name: string;
};

export type SortOptionStoreInfo = {
  sortField: string;
  sortDirection: TableHeaderSortOptions;
};

type FavoritesType = {
  favoriteList: PlanetStoreInfo[];
  sortOption: SortOptionStoreInfo;
};

export const initialState: FavoritesType = {
  favoriteList: [],
  sortOption: {
    sortField: "",
    sortDirection: TableHeaderSortOptions.asc,
  },
};

export const favoriteReducer = createSlice({
  name: "favoriteReducer",
  initialState,
  reducers: {
    updateFavoriteList: (slice: FavoritesType, action) => {
      slice.favoriteList
        .map((planetStoreValue: PlanetStoreInfo) => planetStoreValue.id)
        .includes(action.payload.id)
        ? slice.favoriteList.splice(
            slice.favoriteList.findIndex(
              (planetStoreValue: PlanetStoreInfo) =>
                planetStoreValue.id === action.payload.id
            ),
            1
          )
        : slice.favoriteList.push(action.payload);
    },
    removePlanetFromFavorite: (slice: FavoritesType, action) => {
      slice.favoriteList = slice.favoriteList.filter(
        (planetStoreValue: PlanetStoreInfo) =>
          planetStoreValue.name !== action.payload
      );
    },
    setSortFieldValues: (slice: FavoritesType, action) => {
      slice.sortOption = action.payload;
    },
  },
});

export const {
  updateFavoriteList,
  removePlanetFromFavorite,
  setSortFieldValues,
} = favoriteReducer.actions;

const sliceSelector = (state: any): FavoritesType => state.favoriteReducer;

export const getFavoritesList = createSelector(
  sliceSelector,
  (slice: FavoritesType): PlanetStoreInfo[] => slice.favoriteList
);
export const getSortingFieldValues = createSelector(
  sliceSelector,
  (slice: FavoritesType): SortOptionStoreInfo => slice.sortOption
);
