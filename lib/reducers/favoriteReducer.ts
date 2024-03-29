import { createSelector, createSlice } from "@reduxjs/toolkit";

export type PlanetStoreInfo = {
  id: number;
  name: string;
};

type FavoritesType = {
  favoriteList: PlanetStoreInfo[];
};

export const initialState: FavoritesType = {
  favoriteList: [],
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
  },
});

export const { updateFavoriteList, removePlanetFromFavorite } =
  favoriteReducer.actions;

const sliceSelector = (state: any): FavoritesType => state.favoriteReducer;

export const getFavoritesList = createSelector(
  sliceSelector,
  (slice: FavoritesType): PlanetStoreInfo[] => slice.favoriteList
);
