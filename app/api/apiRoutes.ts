import { PlanetData } from "../models/planetData";
import { PlanetDetailData } from "../models/planetDetailData";
import { PlanetsApiData } from "../models/planetsApiData";
import { PlanetsResultApiData } from "../models/planetsResultApiData";

export const getPlanets = async (): Promise<PlanetData[]> => {
  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ROOT_URL}`,
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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

export const getPlanetDataById = async (
  planetId: number
): Promise<PlanetDetailData> => {
  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ROOT_URL}/${planetId}`,
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result: PlanetsResultApiData = await response.json();
  const planetDetailData: PlanetDetailData = {
    name: result.name,
    climate: result.climate,
    gravity: result.gravity,
    terrain: result.terrain,
  };

  return planetDetailData;
};
