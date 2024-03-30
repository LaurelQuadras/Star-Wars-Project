import { getPlanetDataById, getPlanets } from "./apiRoutes";
import { PlanetData } from "../models/planetData";
import { PlanetDetailData } from "../models/planetDetailData";
import { PlanetsApiData } from "../models/planetsApiData";
import { PlanetsResultApiData } from "../models/planetsResultApiData";

describe("ApiRoutes test", () => {
  it("getPlanets api test", async () => {
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

    const planetData: PlanetData[] = [
      {
        id: 1,
        name: "test-name",
        climate: "test-climate",
        diameter: "test-diameter",
        population: "test-population",
        favorite: false,
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(planetsApiData),
        ok: true,
      })
    ) as jest.Mock;

    const planetDataResult: PlanetData[] = await getPlanets();
    expect(planetDataResult).toStrictEqual(planetData);
  });

  it("getPlanetDataById api test", async () => {
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

    const planetDetailData: PlanetDetailData = {
      name: "test-name",
      climate: "test-climate",
      gravity: "test-gravity",
      terrain: "test-terrain",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(planetsResultApiData),
        status: 200,
        ok: true,
      })
    ) as jest.Mock;

    const planetDetailDataResult: PlanetDetailData = await getPlanetDataById(1);
    expect(planetDetailDataResult).toStrictEqual(planetDetailData);
  });
});
