import { RenderResult, act, render, screen } from "@testing-library/react";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import StoreProvider from "@/app/StoreProvider";
import ContentComponent from "./ContentComponent";
import { ContentComponentProps } from "./ContentComponent.props";

const getRender = ({
  planetsData,
  favortiePlanetsData,
  navOptionSelected,
  planetId,
  openRemoveModal,
}: ContentComponentProps): RenderResult => {
  return render(
    <StoreProvider>
      <ContentComponent
        planetsData={planetsData}
        favortiePlanetsData={favortiePlanetsData}
        navOptionSelected={navOptionSelected}
        planetId={planetId}
        openRemoveModal={openRemoveModal}
      />
    </StoreProvider>
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
  const favortiePlanetsData: PlanetDetailData[] = [];
  const navOptionSelected: NavigationOptions = NavigationOptions.None;
  const planetId: number | undefined = undefined;
  const openRemoveModal = jest.fn();

  it("renders ContentComponent when none of the options are selected", () => {
    getRender({
      planetsData,
      favortiePlanetsData,
      navOptionSelected,
      planetId,
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
      favortiePlanetsData,
      navOptionSelected,
      planetId,
      openRemoveModal,
    });

    expect(screen.getByTestId("content-component-title")).toHaveTextContent(
      "Planets"
    );
  });

  it("renders ContentComponent for Planets page with Planet Detail section present", async () => {
    const planetDetailData: PlanetDetailData = {
      name: "test-name",
      climate: "test-climate",
      gravity: "test-gravity",
      terrain: "test-terrain",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(planetDetailData),
        status: 200,
        ok: true,
      })
    ) as jest.Mock;

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
    const planetId: number | undefined = 1;

    await act(() => {
      getRender({
        planetsData,
        favortiePlanetsData,
        navOptionSelected,
        planetId,
        openRemoveModal,
      });
    });

    expect(screen.getByTestId("content-component-detail")).toBeDefined();
  });

  it("renders ContentComponent for Favorites page", () => {
    const favortiePlanetsData: PlanetDetailData[] = [
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
      favortiePlanetsData,
      navOptionSelected,
      planetId,
      openRemoveModal,
    });

    expect(screen.getByTestId("content-component-title")).toHaveTextContent(
      "Favorites"
    );
  });
});
