import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import StoreProvider from "@/app/StoreProvider";
import TableHeaderComponent from "./TableHeaderComponent";
import { TableHeaderComponentProps } from "./TableHeaderComponent.props";

const getRender = ({
  sortPlanetsList,
}: TableHeaderComponentProps): RenderResult => {
  return render(
    <StoreProvider>
      <TableHeaderComponent sortPlanetsList={sortPlanetsList} />
    </StoreProvider>
  );
};

describe("TableHeaderComponent tests", () => {
  const sortPlanetsList = jest.fn();

  it("renders TableHeaderComponent", () => {
    getRender({ sortPlanetsList });

    expect(screen.getByTestId("table-header-component")).toBeDefined();
  });

  it("renders TableHeaderComponent and clicks on Diameter column to sort the table based on ascending diameter values", () => {
    getRender({ sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Diameter"));

    expect(sortPlanetsList).toHaveBeenCalledWith("diameter", 0);
  });

  it("renders TableHeaderComponent and clicks on Diameter column twice to sort the table based on descending diameter values", () => {
    getRender({ sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Diameter"));

    fireEvent.click(screen.getByTestId("table-header-component-Diameter"));

    expect(sortPlanetsList).toHaveBeenCalledWith("diameter", 1);
  });

  it("renders TableHeaderComponent and clicks on Population column to sort the table based on ascending population values", () => {
    getRender({ sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Population"));

    expect(sortPlanetsList).toHaveBeenCalledWith("population", 0);
  });

  it("renders TableHeaderComponent and clicks on Population column twice to sort the table based on descending population values", () => {
    getRender({ sortPlanetsList });

    fireEvent.click(screen.getByTestId("table-header-component-Population"));

    fireEvent.click(screen.getByTestId("table-header-component-Population"));

    expect(sortPlanetsList).toHaveBeenCalledWith("population", 1);
  });
});
