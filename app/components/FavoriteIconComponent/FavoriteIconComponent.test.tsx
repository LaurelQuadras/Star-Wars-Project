import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { PlanetData } from "@/app/models/planetData";
import { PlanetReducerType } from "@/app/models/reducerModels";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";
import MockStoreProvider from "@/lib/mockReducer/mockStoreProvider";
import FavoriteIconComponent from "./FavoriteIconComponent";
import { FavoriteIconComponentProps } from "./FavoriteIconComponent.props";

const getRender = (
  initialReduxState: PlanetReducerType,
  { planetData }: FavoriteIconComponentProps
): RenderResult => {
  return render(
    <MockStoreProvider initialState={initialReduxState}>
      <FavoriteIconComponent planetData={planetData} />
    </MockStoreProvider>
  );
};

describe("FavoriteIconComponent tests", () => {
  const planetData: PlanetData = {
    id: 1,
    name: "test-name",
    climate: "test-climate",
    diameter: "test-diameter",
    population: "test-population",
    favorite: false,
  };

  const initialReduxState: PlanetReducerType = {
    favoriteList: [],
    sortOption: {
      sortField: "",
      sortDirection: TableHeaderSortOptions.asc,
    },
  };

  it("renders FavoriteIconComponent", () => {
    getRender(initialReduxState, { planetData });

    expect(screen.getByTestId("favorite-icon-component")).toBeDefined();
  });

  it("renders FavoriteIconComponent for favorite as false and clicks on favorite icon to toggle favorite status", () => {
    getRender(initialReduxState, { planetData });

    fireEvent.click(screen.getByTestId("favorite-icon-component"));

    expect(screen.getByTestId("favorite-icon-component-icon")).toHaveAttribute(
      "src",
      "/icons/starIconChecked.svg"
    );
  });

  it("renders FavoriteIconComponent for favorite as true and clicks on favorite icon to toggle favorite status", () => {
    const planetDataForFavoriteAsTrue: PlanetData = JSON.parse(
      JSON.stringify(planetData)
    );
    planetDataForFavoriteAsTrue.favorite = true;

    getRender(initialReduxState, { planetData: planetDataForFavoriteAsTrue });

    fireEvent.click(screen.getByTestId("favorite-icon-component"));

    expect(screen.getByTestId("favorite-icon-component-icon")).toHaveAttribute(
      "src",
      "/icons/starIconUnchecked.svg"
    );
  });

  it("renders FavoriteIconComponent where the planet is part of the favorite list in redux store", () => {
    const initialReduxState: PlanetReducerType = {
      favoriteList: [{ id: 1, name: "test-name" }],
      sortOption: {
        sortField: "",
        sortDirection: TableHeaderSortOptions.asc,
      },
    };

    getRender(initialReduxState, { planetData });

    expect(screen.getByTestId("favorite-icon-component-icon")).toHaveAttribute(
      "src",
      "/icons/starIconChecked.svg"
    );
  });
});
