import { PlanetData } from "../models/planetData";
import { PlanetsApiData } from "../models/planetsApiData";
import { PlanetsResultApiData } from "../models/planetsResultApiData";

export const getPlanets = async (): Promise<PlanetData[]> => {
  const response: Response = await fetch(`${process.env.API_ROOT_URL}`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const planetApiData: PlanetsApiData = await response.json();
  const planetData: PlanetData[] = planetApiData.results.map(
    (planetResultApiData: PlanetsResultApiData) =>
      getPlanetData(planetResultApiData)
  );

  return planetData;
};

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
