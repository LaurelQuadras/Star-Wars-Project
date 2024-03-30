import { PlanetData } from "../../models/planetData";
import { TableHeaderSortOptions } from "../../models/tableHeaderSortOptions";

/**
 * This method sorts the PlanetData list based on the column and the sorting option selected
 * @param planetsList
 * @param column
 * @param sortOption
 * @returns the sorted PlanetData list. For descending result, invalid values record are shown at first, followed by valid sorted list. For ascending result, invalid values record are shown at last, preceded by valid sorted list.
 */
export const filterSortPlanetsList = (
  planetsList: PlanetData[],
  column: keyof PlanetData,
  sortOption: TableHeaderSortOptions
): PlanetData[] => {
  let sortedPlanetsList: PlanetData[] = [];

  /*
  Here, we extract the PlanetData records which has invalid selected column value which cannot be sorted. It is then appended to the final sorted PlanetData list and it's position in the final list is based on the sorting direction applied.
  */
  const invalidValuesPlanetList: PlanetData[] = planetsList.filter(
    (pp: PlanetData) => Number.isNaN(Number(pp[column]))
  );

  /*
  Here we extract the PlanetData records which have valid selected column value. We then perform the sorting operation on this list of records.
  */
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
