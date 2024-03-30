import { RenderResult, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import Home from "./page";
import { PlanetsApiData } from "../models/planetsApiData";
import StoreProvider from "../StoreProvider";

const getRender = async (): Promise<RenderResult> => {
  const planetsHome: ReactNode = await Home();
  return render(<StoreProvider>{planetsHome}</StoreProvider>);
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

describe("PlanetsPage tests", () => {
  const planetsApiData: PlanetsApiData = {
    count: 1,
    next: "test-next",
    previous: "test-previous",
    results: [
      {
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
      },
    ],
  };

  it("renders Planets Page", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(planetsApiData),
        ok: true,
      })
    ) as jest.Mock;

    await getRender();

    expect(screen.getByTestId("planets-page")).toBeDefined();
  });
});
