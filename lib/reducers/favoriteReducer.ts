import { createSelector, createSlice } from "@reduxjs/toolkit";

type FavoritesType = {
  favoriteList: number[];
};

export const initialState: FavoritesType = {
  favoriteList: [],
};

export const favoriteReducer = createSlice({
  name: "favoriteReducer",
  initialState,
  reducers: {
    updateFavoriteList: (slice: FavoritesType, action) => {
      slice.favoriteList.includes(action.payload)
        ? slice.favoriteList.splice(
            slice.favoriteList.indexOf(action.payload),
            1
          )
        : slice.favoriteList.push(action.payload);
    },
  },
});

export const { updateFavoriteList } = favoriteReducer.actions;

const sliceSelector = (state: any): FavoritesType => state.favoriteReducer;

export const getFavoritesList = createSelector(
  sliceSelector,
  (slice: FavoritesType): number[] => slice.favoriteList
);
