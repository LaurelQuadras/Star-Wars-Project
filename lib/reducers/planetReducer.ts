import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  PlanetReducerType,
  PlanetStoreInfo,
  SortOptionStoreInfo,
} from "@/app/models/reducerModels";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";

export const initialStateObject: PlanetReducerType = {
  favoriteList: [],
  sortOption: {
    sortField: "",
    sortDirection: TableHeaderSortOptions.asc,
  },
};

/**
 * This method creates the planetReducer slice which stores the following two fields: favoriteList and sortOption.
 * @param initialState This param is used if we have to supply a custom initialState object for unit testing purposes. For the actual application and for those unit tests which does not require custom initialState, it will be the initialStateObject defined above.
 * @returns It creates the redux slice and stores the fields: favoriteList and sortOption. It has three reducers:
 * updateFavoriteList: This reducer is invoked when the user toggles the favorite planet icon. It updates the favoriteList to include only those planet values which has been marked as favorite by user.
 * removePlanetFromFavorite: This reducer is invoked when the user removes a planet marked as favorite from the favorites page. It updates the favoriteList to include only those planet values which has been marked as favorite by user.
 * setSortFieldValues: This reducer is invoked when the user clicks on the Sorting column to sort the Planets List. It updates the sortOption field to contain the current sorting option (sort field and sort direction) which the user has applied.
 */
export const planetReducer = (
  initialState: PlanetReducerType = initialStateObject
) =>
  createSlice({
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
} = planetReducer().actions;

const sliceSelector = (state: any): PlanetReducerType => state.planetReducer;

//This selector returns the favorites list from the redux store.
export const getFavoritesList = createSelector(
  sliceSelector,
  (slice: PlanetReducerType): PlanetStoreInfo[] => slice.favoriteList
);

//This selector returns the sorting option object from the redux store.
export const getSortingFieldValues = createSelector(
  sliceSelector,
  (slice: PlanetReducerType): SortOptionStoreInfo => slice.sortOption
);
