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

  /**When the user comes back from any page to Planets or PlanetsDetail page, then we would update the UI to reflect the appropriate sorting option (from redux store) which the user has applied before. */
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

  /**
   *This method is called when the user clicks on the Table Column for Sorting purpose. After verifying that the column is either Diameter or Population, we call sortPlanetList method and passing the column name and sort direction as params. We also update the appropriate states: sortOption and sortFieldValues to reflect it in the UI. And we dispatch the column name and sort direction to redux to store it in global state.
   * @param column the table header column which the user has selected for sorting.
   * @returns calls sortPlanetList method, updates the appropriate states and dispatches an action to store the sorting values in redux
   */
  const onTableSortClick = (column: keyof PlanetData): void => {
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
              data-testid={`table-header-component-sort-icon-${tableHeaderColumn}`}
            >
              <img src="/icons/arrowIcon.svg" alt="sort icon" />
            </picture>
          )}
        </div>
      ))}
    </div>
  );
}
