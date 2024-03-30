import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import StoreProvider from "@/app/StoreProvider";
import PlanetsComponent from "./PlanetsComponent";
import { PlanetsComponentProps } from "./PlanetsComponent.props";

const getRender = ({
  planetsData,
  favortiePlanetsData,
  planetDetailData,
}: PlanetsComponentProps): RenderResult => {
  return render(
    <StoreProvider>
      <PlanetsComponent
        planetsData={planetsData}
        favortiePlanetsData={favortiePlanetsData}
        planetDetailData={planetDetailData}
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
    usePathname() {
      return {
        includes: jest.fn().mockReturnValue(true),
      };
    },
  };
});

describe("PlanetsComponent tests", () => {
  const planetsData: PlanetData[] = [];
  const favortiePlanetsData: PlanetDetailData[] = [];
  const planetDetailData: PlanetDetailData | undefined = undefined;

  const usePathname = jest.spyOn(require("next/navigation"), "usePathname");

  it("renders PlanetsComponent for Planets page", () => {
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
    getRender({ planetsData, favortiePlanetsData, planetDetailData });

    expect(screen.getByTestId("content-component-title")).toHaveTextContent(
      "Planets"
    );
  });

  it("renders PlanetsComponent for Planets page with planet detail view present", () => {
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
    const planetDetailData: PlanetDetailData = {
      name: "test-name-1",
      climate: "test-climate-1",
      gravity: "test-gravity-1",
      terrain: "test-terrain-1",
    };

    getRender({ planetsData, favortiePlanetsData, planetDetailData });

    expect(screen.getByTestId("planet-detail-component")).toBeDefined();
  });

  it("renders PlanetsComponent for Favorites page", () => {
    usePathname.mockImplementation(() => ({
      includes: jest.fn().mockReturnValue(false),
    }));

    const favortiePlanetsData: PlanetDetailData[] = [
      {
        name: "test-name-1",
        climate: "test-climate-1",
        gravity: "test-gravity-1",
        terrain: "test-terrain-1",
      },
      {
        name: "test-name-2",
        climate: "test-climate-2",
        gravity: "test-gravity-2",
        terrain: "test-terrain-2",
      },
    ];
    getRender({ planetsData, favortiePlanetsData, planetDetailData });

    waitFor(() =>
      expect(screen.getByTestId("content-component-title")).toHaveTextContent(
        "Favorites"
      )
    );
  });

  it("renders PlanetsComponent for Favorites page, and clicks on remove button to open remove modal and clicks on remove button to remove the planet from favorites", () => {
    usePathname.mockImplementation(() => ({
      includes: jest.fn().mockReturnValue(false),
    }));
    usePathname.mockReturnValueOnce("/favorites");

    const favortiePlanetsData: PlanetDetailData[] = [
      {
        name: "test-name-1",
        climate: "test-climate-1",
        gravity: "test-gravity-1",
        terrain: "test-terrain-1",
      },
      {
        name: "test-name-2",
        climate: "test-climate-2",
        gravity: "test-gravity-2",
        terrain: "test-terrain-2",
      },
    ];
    getRender({ planetsData, favortiePlanetsData, planetDetailData });

    waitFor(() =>
      fireEvent.click(
        screen.getAllByTestId("favorite-component-remove-button")[0]
      )
    );

    waitFor(() =>
      fireEvent.click(screen.getByTestId("popup-modal-component-remove-button"))
    );

    waitFor(() =>
      expect(screen.getByTestId("popup-modal-component")).not.toBeDefined()
    );
  });
});
