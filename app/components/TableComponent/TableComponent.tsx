"use client";

import { useEffect, useState } from "react";
import { PlanetData } from "@/app/models/planetData";
import { SortOptionStoreInfo } from "@/app/models/reducerModels";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";
import { filterSortPlanetsList } from "@/app/utils/filterSortPlanetList/filterSortPlanetsList";
import { useAppSelector } from "@/lib/hooks";
import { getSortingFieldValues } from "@/lib/reducers/planetReducer";
import { TableComponentProps } from "./TableComponent.props";
import TableHeaderComponent from "./TableHeaderComponent/TableHeaderComponent";
import TableRecordComponent from "./TableRecordComponent/TableRecordComponent";

export default function TableComponent({ planetsData }: TableComponentProps) {
  const sortValues: SortOptionStoreInfo = useAppSelector(getSortingFieldValues);
  const [planetsList, setPlanetsList] = useState<PlanetData[]>(planetsData);

  /**When the user comes back from any page to Planets or PlanetsDetail page, then we would perform the appropriate sorting operation (from redux store) for planets on the table based on what the user has applied before. */
  useEffect(() => {
    const { sortField, sortDirection } = sortValues;
    if (sortField !== "") {
      const sortedPlanetsList: PlanetData[] = filterSortPlanetsList(
        planetsList,
        sortField.toLowerCase() as keyof PlanetData,
        sortDirection
      );

      setPlanetsList(sortedPlanetsList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This method is called when the user clicks on the Table header column to sort the table.
   * @param column the column which the user has clicked. It is either Diameter or Population.
   * @param sortOption the sortOption which the user wants. It is either Ascending or Descending.
   * It updates the planetsList state with the new sorted values.
   */
  const sortPlanetsList = (
    column: keyof PlanetData,
    sortOption: TableHeaderSortOptions
  ): void => {
    const sortedPlanetsList: PlanetData[] = filterSortPlanetsList(
      planetsList,
      column,
      sortOption
    );

    setPlanetsList(sortedPlanetsList);
  };

  return (
    <div className="table-component" data-testid="table-component">
      <TableHeaderComponent sortPlanetsList={sortPlanetsList} />
      {planetsList.map((planet: PlanetData) => (
        <TableRecordComponent key={planet.name} planetData={planet} />
      ))}
    </div>
  );
}
