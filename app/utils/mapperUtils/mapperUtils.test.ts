import { PlanetData } from "@/app/models/planetData";
import { PlanetsResultApiData } from "@/app/models/planetsResultApiData";
import { getPlanetData } from "./mapperUtils";

describe("MapperUtils tests", () => {
  it("converts PlanetsResultApiData object to PlanetData object and adds the id field", () => {
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

    const planetData: PlanetData = {
      id: 1,
      name: "test-name",
      climate: "test-climate",
      diameter: "test-diameter",
      population: "test-population",
      favorite: false,
    };

    const result: PlanetData = getPlanetData(planetsResultApiData, 0);
    expect(result).toStrictEqual(planetData);
  });
});
