import { RenderResult, act, render, screen } from "@testing-library/react";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import MockStoreProvider from "@/lib/mockReducer/mockStoreProvider";
import ContentComponent from "./ContentComponent";
import { ContentComponentProps } from "./ContentComponent.props";

const getRender = ({
  planetsData,
  favoritePlanetsData,
  navOptionSelected,
  planetDetailData,
  openRemoveModal,
}: ContentComponentProps): RenderResult => {
  return render(
    <MockStoreProvider>
      <ContentComponent
        planetsData={planetsData}
        favoritePlanetsData={favoritePlanetsData}
        navOptionSelected={navOptionSelected}
        planetDetailData={planetDetailData}
        openRemoveModal={openRemoveModal}
      />
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

describe("ContentComponent tests", () => {
  const planetsData: PlanetData[] = [];
  const favoritePlanetsData: PlanetDetailData[] = [];
  const navOptionSelected: NavigationOptions = NavigationOptions.None;
  const planetDetailData: PlanetDetailData | undefined = undefined;
  const openRemoveModal = jest.fn();

  it("renders ContentComponent when none of the options are selected", () => {
    getRender({
      planetsData,
      favoritePlanetsData,
      navOptionSelected,
      planetDetailData,
      openRemoveModal,
    });

    expect(screen.getByTestId("content-component-data")).toHaveTextContent(
      "Please select any of the Navigation Options on the left side"
    );
  });

  it("renders ContentComponent for Planets page", () => {
    const planetsData: PlanetData[] = [
      {
        id: 1,
        name: "test-name-1",
        climate: "test-climate-1",
        diameter: "test-diameter-1",
        population: "test-population-1",
        favorite: false,
      },
      {
        id: 2,
        name: "test-name-2",
        climate: "test-climate-2",
        diameter: "test-diameter-2",
        population: "test-population-2",
        favorite: false,
      },
    ];
    const navOptionSelected: NavigationOptions = NavigationOptions.Planets;

    getRender({
      planetsData,
      favoritePlanetsData,
      navOptionSelected,
      planetDetailData,
      openRemoveModal,
    });

    expect(screen.getByTestId("content-component-title")).toHaveTextContent(
      "Planets"
    );
  });

  it("renders ContentComponent for Planets page with Planet Detail section present", async () => {
    const planetsData: PlanetData[] = [
      {
        id: 1,
        name: "test-name-1",
        climate: "test-climate-1",
        diameter: "test-diameter-1",
        population: "test-population-1",
        favorite: false,
      },
      {
        id: 2,
        name: "test-name-2",
        climate: "test-climate-2",
        diameter: "test-diameter-2",
        population: "test-population-2",
        favorite: false,
      },
    ];
    const navOptionSelected: NavigationOptions = NavigationOptions.Planets;
    const planetDetailData: PlanetDetailData | undefined = {
      name: "test-name-1",
      climate: "test-climate-1",
      gravity: "test-gravity-1",
      terrain: "test-terrain-1",
    };

    await act(() => {
      getRender({
        planetsData,
        favoritePlanetsData,
        navOptionSelected,
        planetDetailData,
        openRemoveModal,
      });
    });

    expect(screen.getByTestId("content-component-detail")).toBeDefined();
  });

  it("renders ContentComponent for Favorites page", () => {
    const favoritePlanetsData: PlanetDetailData[] = [
      {
        name: "test-name",
        climate: "test-climate",
        gravity: "test-gravity",
        terrain: "test-terrain",
      },
      {
        name: "test-name",
        climate: "test-climate",
        gravity: "test-gravity",
        terrain: "test-terrain",
      },
    ];
    const navOptionSelected: NavigationOptions = NavigationOptions.Favorites;

    getRender({
      planetsData,
      favoritePlanetsData,
      navOptionSelected,
      planetDetailData,
      openRemoveModal,
    });

    expect(screen.getByTestId("content-component-title")).toHaveTextContent(
      "Favorites"
    );
  });
});
