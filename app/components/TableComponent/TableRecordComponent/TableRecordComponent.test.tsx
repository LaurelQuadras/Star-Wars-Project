import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { PlanetData } from "@/app/models/planetData";
import StoreProvider from "@/app/StoreProvider";
import TableRecordComponent from "./TableRecordComponent";
import { TableRecordComponentProps } from "./TableRecordComponent.props";

const getRender = ({ planetData }: TableRecordComponentProps): RenderResult => {
  return render(
    <StoreProvider>
      <TableRecordComponent planetData={planetData} />
    </StoreProvider>
  );
};

jest.mock("next/navigation", () => {
  return {
    useRouter() {
      return {
        route: "",
        pathname: "",
        query: "",
        asPath: "",
        push: jest.fn(),
        replace: jest.fn(),
      };
    },
  };
});

describe("TableRecordComponent tests", () => {
  const planetData: PlanetData = {
    id: 1,
    name: "test-name",
    climate: "test-climate",
    diameter: "test-diameter",
    population: "test-population",
    favorite: false,
  };

  const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

  it("renders TableRecordComponent", () => {
    getRender({ planetData });

    expect(screen.getByTestId("table-record-component")).toBeDefined();
  });

  it("renders TableRecordComponent and displays it's contents", () => {
    getRender({ planetData });

    expect(
      screen.getByTestId("table-record-component-name-column")
    ).toHaveTextContent(planetData.name);
    expect(
      screen.getByTestId("table-record-component-climate-column")
    ).toHaveTextContent(planetData.climate);
    expect(
      screen.getByTestId("table-record-component-diameter-column")
    ).toHaveTextContent(planetData.diameter);
    expect(
      screen.getByTestId("table-record-component-population-column")
    ).toHaveTextContent(planetData.population);
  });

  it("renders TableRecordComponent and clicks on a row to navigate to Planet detail view", () => {
    const replaceFunction = jest.fn();
    useRouter.mockImplementation(() => ({
      replace: replaceFunction,
    }));

    getRender({ planetData });

    fireEvent.click(screen.getByTestId("table-record-component"));

    expect(replaceFunction).toHaveBeenCalledWith(`/planets/${planetData.id}`);
  });
});
