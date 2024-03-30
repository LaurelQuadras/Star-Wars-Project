import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import MockStoreProvider from "@/lib/mockReducer/mockStoreProvider";
import Home from "./page";
import { PlanetsResultApiData } from "../models/planetsResultApiData";
import { PlanetReducerType } from "../models/reducerModels";
import { TableHeaderSortOptions } from "../models/tableHeaderSortOptions";

const getRender = (initialReduxState: PlanetReducerType): RenderResult => {
  return render(
    <MockStoreProvider initialState={initialReduxState}>
      <Home />
    </MockStoreProvider>
  );
};

jest.mock("next/navigation", () => {
  return {
    useRouter() {
      return {
        route: "",
        pathname: "",
        query: "",
        asPath: "",
        push: jest.fn(),
        replace: jest.fn(),
      };
    },
  };
});

describe("FavoritesPage Tests", () => {
  const initialReduxState: PlanetReducerType = {
    favoriteList: [],
    sortOption: {
      sortField: "",
      sortDirection: TableHeaderSortOptions.asc,
    },
  };

  it("renders Favorites Page", () => {
    getRender(initialReduxState);
    expect(screen.getByTestId("favorites-page")).toBeDefined();
  });

  it("renders Favorites Page with favorites planets present and displayes it in UI", () => {
    const planetsResultApiData: PlanetsResultApiData = {
      name: "test-name",
      rotation_period: "test-rotation-period",
      orbital_period: "test-orbital-period",
      diameter: "test-diameter",
      climate: "test-climate",
      gravity: "test-gravity",
      terrain: "test-terrain",
      surface_water: "test-surface-water",
      population: "test-population",
      residents: "test-residents",
      films: "test-films",
      created: new Date(),
      edited: new Date(),
      url: "test-string",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(planetsResultApiData),
        status: 200,
        ok: true,
      })
    ) as jest.Mock;

    const favoritesInitialReduxState: PlanetReducerType = JSON.parse(
      JSON.stringify(initialReduxState)
    );
    favoritesInitialReduxState.favoriteList = [{ id: 1, name: "test-name" }];

    getRender(favoritesInitialReduxState);
    waitFor(() =>
      expect(screen.getByTestId("favorite-component")).toBeDefined()
    );
  });
});
