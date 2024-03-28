"use client";

import { useState } from "react";
import { PlanetData } from "@/app/models/planetData";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";
import { filterSortPlanetsList } from "@/app/utils/filterSortPlanetsList";
import { TableComponentProps } from "./TableComponent.props";
import TableHeaderComponent from "./TableHeaderComponent/TableHeaderComponent";
import TableRecordComponent from "./TableRecordComponent/TableRecordComponent";

export default function TableComponent({ planetsData }: TableComponentProps) {
  const [planetsList, setPlanetsList] = useState<PlanetData[]>(planetsData);

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
    <div className="table-component">
      <TableHeaderComponent sortPlanetsList={sortPlanetsList} />
      {planetsList.map((planet: PlanetData) => (
        <TableRecordComponent key={planet.name} planetData={planet} />
      ))}
    </div>
  );
}
