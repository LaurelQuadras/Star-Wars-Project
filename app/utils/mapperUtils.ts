import { PlanetData } from "../models/planetData";
import { PlanetsResultApiData } from "../models/planetsResultApiData";

export const getPlanetData = (
  planetsResultApiData: PlanetsResultApiData
): PlanetData => {
  let planetData: PlanetData = {
    name: planetsResultApiData.name,
    climate: planetsResultApiData.climate,
    diameter: planetsResultApiData.diameter,
    population: planetsResultApiData.population,
    favorite: false,
  };

  return planetData;
};
