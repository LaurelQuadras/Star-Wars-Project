"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlanetData } from "@/app/models/planetData";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";
import { filterSortPlanetsList } from "@/app/utils/filterSortPlanetsList";
import { TableComponentProps } from "./TableComponent.props";
import TableHeaderComponent from "./TableHeaderComponent/TableHeaderComponent";
import TableRecordComponent from "./TableRecordComponent/TableRecordComponent";

export default function TableComponent({ planetsData }: TableComponentProps) {
  const router = useRouter();
  const [planetsList, setPlanetsList] = useState<PlanetData[]>(planetsData);

  const onTableRecordClick = (planetName: string): void => {
    const planetSelected: PlanetData = planetsData.filter(
      (planetData: PlanetData) => planetData.name === planetName
    )[0];
    const planetIndex: number = planetsData.indexOf(planetSelected);
    const url = `/planets/${planetIndex + 1}`;
    router.replace(url);
  };

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
        <TableRecordComponent
          key={planet.name}
          planetData={planet}
          onTableRecordClick={onTableRecordClick}
        />
      ))}
    </div>
  );
}
