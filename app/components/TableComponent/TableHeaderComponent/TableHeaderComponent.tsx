import { useState } from "react";
import { PlanetData } from "@/app/models/planetData";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";
import { TableHeaderComponentProps } from "./TableHeaderComponent.props";

export default function TableHeaderComponent({
  sortPlanetsList,
}: TableHeaderComponentProps) {
  const [selectedColumn, setSelectedColumn] = useState<keyof PlanetData>();
  const [sortOption, setSortOption] = useState<TableHeaderSortOptions>(
    TableHeaderSortOptions.asc
  );

  const tableHeaderColumns: string[] = [
    "Name",
    "Climate",
    "Diameter",
    "Population",
    "Favorite",
  ];

  const onTableSortClick = (column: keyof PlanetData) => {
    if (!["Diameter", "Population"].includes(column)) {
      return;
    }

    if (
      selectedColumn === column &&
      sortOption === TableHeaderSortOptions.asc
    ) {
      setSortOption(TableHeaderSortOptions.desc);
      sortPlanetsList(
        column.toLowerCase() as keyof PlanetData,
        TableHeaderSortOptions.desc
      );
    } else {
      setSortOption(TableHeaderSortOptions.asc);
      sortPlanetsList(
        column.toLowerCase() as keyof PlanetData,
        TableHeaderSortOptions.asc
      );
      setSelectedColumn(column);
    }
  };

  return (
    <div className="table-header-component">
      {tableHeaderColumns.map((tableHeaderColumn: string, index: number) => (
        <div
          key={index}
          className="table-header-component__column"
          onClick={() =>
            onTableSortClick(tableHeaderColumn as keyof PlanetData)
          }
        >
          <span className="table-header-component__column--text">
            {tableHeaderColumn}
          </span>
          {selectedColumn === tableHeaderColumn && (
            <picture
              className={`table-header-component__column-${
                sortOption === TableHeaderSortOptions.asc
                  ? "-icon"
                  : "-icon-rotate"
              }`}
            >
              <img src="/icons/arrowIcon.svg" alt="sort icon" />
            </picture>
          )}
        </div>
      ))}
    </div>
  );
}
