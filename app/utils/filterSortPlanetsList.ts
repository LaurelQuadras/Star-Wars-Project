import { PlanetData } from "../models/planetData";
import { TableHeaderSortOptions } from "../models/tableHeaderSortOptions";

export const filterSortPlanetsList = (
  planetsList: PlanetData[],
  column: keyof PlanetData,
  sortOption: TableHeaderSortOptions
): PlanetData[] => {
  let sortedPlanetsList: PlanetData[] = [];

  sortOption === TableHeaderSortOptions.desc
    ? (sortedPlanetsList = [...planetsList].sort(
        (planetOne: PlanetData, planetTwo: PlanetData) =>
          Number(planetTwo[column]) - Number(planetOne[column])
      ))
    : (sortedPlanetsList = [...planetsList].sort(
        (planetOne: PlanetData, planetTwo: PlanetData) =>
          Number(planetOne[column]) - Number(planetTwo[column])
      ));

  return sortedPlanetsList;
};
