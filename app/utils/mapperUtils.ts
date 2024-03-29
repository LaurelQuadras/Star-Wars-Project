import { PlanetData } from "../models/planetData";
import { PlanetsResultApiData } from "../models/planetsResultApiData";

export const getPlanetData = (
  planetsResultApiData: PlanetsResultApiData,
  index: number
): PlanetData => {
  let planetData: PlanetData = {
    id: index + 1,
    name: planetsResultApiData.name,
    climate: planetsResultApiData.climate,
    diameter: planetsResultApiData.diameter,
    population: planetsResultApiData.population,
    favorite: false,
  };

  return planetData;
};
