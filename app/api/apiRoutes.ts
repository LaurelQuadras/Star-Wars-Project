import { PlanetData } from "../models/planetData";
import { PlanetDetailData } from "../models/planetDetailData";
import { PlanetsApiData } from "../models/planetsApiData";
import { PlanetsResultApiData } from "../models/planetsResultApiData";
import { getPlanetData } from "../utils/mapperUtils/mapperUtils";

/**
 * This api call is made to fetch the planets list. The response is then cached as HTTP Cache and stored indefinitely.
 * This cache response is returned from henceforth on every subsequent request.
 * @returns Object of list of PlanetData which is generated by converting the PlanetsApiData api response to PlanetData model.
 */
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
    (planetResultApiData: PlanetsResultApiData, index: number) =>
      getPlanetData(planetResultApiData, index)
  );

  return planetData;
};

/**
 * This api call is made to fetch the planet detail data by passing the planetId as parameter. The response is then cached
 * as HTTP Cache and stored indefinitely. This cache response is returned from henceforth on every subsequent request.
 * @returns PlanetDetailData object which is generated by converting the PlanetsResultApiData api response to PlanetDetailData model.
 */
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
