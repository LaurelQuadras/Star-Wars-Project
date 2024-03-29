import { PlanetData } from "../models/planetData";
import { TableHeaderSortOptions } from "../models/tableHeaderSortOptions";

export const filterSortPlanetsList = (
  planetsList: PlanetData[],
  column: keyof PlanetData,
  sortOption: TableHeaderSortOptions
): PlanetData[] => {
  let sortedPlanetsList: PlanetData[] = [];

  const invalidValuesPlanetList: PlanetData[] = planetsList.filter(
    (pp: PlanetData) => Number.isNaN(Number(pp[column]))
  );

  const validValuesPlanetList: PlanetData[] = planetsList.filter(
    (pp: PlanetData) => !Number.isNaN(Number(pp[column]))
  );

  sortOption === TableHeaderSortOptions.desc
    ? (sortedPlanetsList = [...validValuesPlanetList].sort(
        (planetOne: PlanetData, planetTwo: PlanetData) =>
          Number(planetTwo[column]) - Number(planetOne[column])
      ))
    : (sortedPlanetsList = [...validValuesPlanetList].sort(
        (planetOne: PlanetData, planetTwo: PlanetData) =>
          Number(planetOne[column]) - Number(planetTwo[column])
      ));

  return sortOption === TableHeaderSortOptions.desc
    ? [...invalidValuesPlanetList, ...sortedPlanetsList]
    : [...sortedPlanetsList, ...invalidValuesPlanetList];
};
