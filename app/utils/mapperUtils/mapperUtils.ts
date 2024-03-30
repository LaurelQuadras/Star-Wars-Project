import { PlanetData } from "../../models/planetData";
import { PlanetsResultApiData } from "../../models/planetsResultApiData";

/**
 * This is used to convert the API response of GetPlanets to PlanetData model. It also adds the id to each record, which is used to get Planet Detail Data for that planet.
 * @param planetsResultApiData
 * @param index
 * @returns PlanetData model
 */
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
