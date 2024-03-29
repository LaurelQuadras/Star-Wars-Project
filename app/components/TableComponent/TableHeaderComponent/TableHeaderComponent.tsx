import { useEffect, useState } from "react";
import { PlanetData } from "@/app/models/planetData";
import { SortOptionStoreInfo } from "@/app/models/reducerModels";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getSortingFieldValues,
  setSortFieldValues,
} from "@/lib/reducers/planetReducer";
import { TableHeaderComponentProps } from "./TableHeaderComponent.props";

export default function TableHeaderComponent({
  sortPlanetsList,
}: TableHeaderComponentProps) {
  const dispatch = useAppDispatch();
  const sortValues: SortOptionStoreInfo = useAppSelector(getSortingFieldValues);

  const [selectedColumn, setSelectedColumn] = useState<keyof PlanetData>();
  const [sortOption, setSortOption] = useState<TableHeaderSortOptions>(
    TableHeaderSortOptions.asc
  );

  useEffect(() => {
    const { sortField, sortDirection } = sortValues;
    if (sortField !== "") {
      setSelectedColumn(sortField as keyof PlanetData);
      setSortOption(sortDirection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      dispatch(
        setSortFieldValues({
          sortField: column,
          sortDirection: TableHeaderSortOptions.desc,
        })
      );
      setSortOption(TableHeaderSortOptions.desc);
      sortPlanetsList(
        column.toLowerCase() as keyof PlanetData,
        TableHeaderSortOptions.desc
      );
    } else {
      dispatch(
        setSortFieldValues({
          sortField: column,
          sortDirection: TableHeaderSortOptions.asc,
        })
      );
      setSortOption(TableHeaderSortOptions.asc);
      sortPlanetsList(
        column.toLowerCase() as keyof PlanetData,
        TableHeaderSortOptions.asc
      );
      setSelectedColumn(column);
    }
  };

  return (
    <div
      className="table-header-component"
      data-testid="table-header-component"
    >
      {tableHeaderColumns.map((tableHeaderColumn: string, index: number) => (
        <div
          key={index}
          className={`table-header-component__column${
            ["Diameter", "Population"].includes(tableHeaderColumn)
              ? "--sortable"
              : ""
          }`}
          onClick={() =>
            onTableSortClick(tableHeaderColumn as keyof PlanetData)
          }
          data-testid={`table-header-component-${tableHeaderColumn}`}
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
