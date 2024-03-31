import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { PlanetReducerType } from "@/app/models/reducerModels";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";
import MockStoreProvider from "@/lib/mockReducer/mockStoreProvider";
import TableHeaderComponent from "./TableHeaderComponent";
import { TableHeaderComponentProps } from "./TableHeaderComponent.props";

const getRender = (
  initialReduxState: PlanetReducerType,
  { tableHeaderColumns, sortPlanetsList }: TableHeaderComponentProps
): RenderResult => {
  return render(
    <MockStoreProvider initialState={initialReduxState}>
      <TableHeaderComponent
        tableHeaderColumns={tableHeaderColumns}
        sortPlanetsList={sortPlanetsList}
      />
    </MockStoreProvider>
  );
};

describe("TableHeaderComponent tests", () => {
  const sortPlanetsList = jest.fn();
  const tableHeaderColumns: string[] = [
    "Name",
    "Climate",
    "Diameter",
    "Population",
    "Favorite",
  ];

  const initialReduxState: PlanetReducerType = {
    favoriteList: [],
    sortOption: {
      sortField: "",
      sortDirection: TableHeaderSortOptions.asc,
    },
  };

  it("renders TableHeaderComponent", () => {
    getRender(initialReduxState, { tableHeaderColumns, sortPlanetsList });

    expect(screen.getByTestId("table-header-component")).toBeDefined();
  });

  it("renders TableHeaderComponent and tries to click on Name column which does not have sort functionality", () => {
    getRender(initialReduxState, { tableHeaderColumns, sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Name"));

    expect(sortPlanetsList).not.toHaveBeenCalled();
  });

  it("renders TableHeaderComponent and clicks on Diameter column to sort the table based on ascending diameter values", () => {
    getRender(initialReduxState, { tableHeaderColumns, sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Diameter"));

    expect(sortPlanetsList).toHaveBeenCalledWith("diameter", 0);
  });

  it("renders TableHeaderComponent and clicks on Diameter column twice to sort the table based on descending diameter values", () => {
    getRender(initialReduxState, { tableHeaderColumns, sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Diameter"));

    fireEvent.click(screen.getByTestId("table-header-component-Diameter"));

    expect(sortPlanetsList).toHaveBeenCalledWith("diameter", 1);
  });

  it("renders TableHeaderComponent and clicks on Population column to sort the table based on ascending population values", () => {
    getRender(initialReduxState, { tableHeaderColumns, sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Population"));

    expect(sortPlanetsList).toHaveBeenCalledWith("population", 0);
  });

  it("renders TableHeaderComponent and clicks on Population column twice to sort the table based on descending population values", () => {
    getRender(initialReduxState, { tableHeaderColumns, sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Population"));

    fireEvent.click(screen.getByTestId("table-header-component-Population"));

    expect(sortPlanetsList).toHaveBeenCalledWith("population", 1);
  });

  it("renders TableHeaderComponent where there is a valid sort option in redux store, it displays the sort icon for the proper column in the UI", () => {
    const initialReduxState: PlanetReducerType = {
      favoriteList: [],
      sortOption: {
        sortField: "Diameter",
        sortDirection: TableHeaderSortOptions.asc,
      },
    };

    getRender(initialReduxState, { tableHeaderColumns, sortPlanetsList });

    waitFor(() =>
      expect(
        screen.getByTestId("table-header-component-sort-icon-Diameter")
      ).toBeDefined()
    );
  });
});
