import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  PlanetReducerType,
  PlanetStoreInfo,
  SortOptionStoreInfo,
} from "@/app/models/reducerModels";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";

export const initialState: PlanetReducerType = {
  favoriteList: [],
  sortOption: {
    sortField: "",
    sortDirection: TableHeaderSortOptions.asc,
  },
};

export const planetReducer = createSlice({
  name: "planetReducer",
  initialState,
  reducers: {
    updateFavoriteList: (slice: PlanetReducerType, action) => {
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
    removePlanetFromFavorite: (slice: PlanetReducerType, action) => {
      slice.favoriteList = slice.favoriteList.filter(
        (planetStoreValue: PlanetStoreInfo) =>
          planetStoreValue.name !== action.payload
      );
    },
    setSortFieldValues: (slice: PlanetReducerType, action) => {
      slice.sortOption = action.payload;
    },
  },
});

export const {
  updateFavoriteList,
  removePlanetFromFavorite,
  setSortFieldValues,
} = planetReducer.actions;

const sliceSelector = (state: any): PlanetReducerType => state.planetReducer;

export const getFavoritesList = createSelector(
  sliceSelector,
  (slice: PlanetReducerType): PlanetStoreInfo[] => slice.favoriteList
);
export const getSortingFieldValues = createSelector(
  sliceSelector,
  (slice: PlanetReducerType): SortOptionStoreInfo => slice.sortOption
);
