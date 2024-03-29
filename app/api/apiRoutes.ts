import { PlanetData } from "../models/planetData";
import { PlanetDetailData } from "../models/planetDetailData";
import { PlanetsApiData } from "../models/planetsApiData";
import { PlanetsResultApiData } from "../models/planetsResultApiData";
import { getPlanetData } from "../utils/mapperUtils";

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
