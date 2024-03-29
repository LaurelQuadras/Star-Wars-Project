import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { PlanetData } from "@/app/models/planetData";
import StoreProvider from "@/app/StoreProvider";
import TableComponent from "./TableComponent";
import { TableComponentProps } from "./TableComponent.props";

const getRender = ({ planetsData }: TableComponentProps): RenderResult => {
  return render(
    <StoreProvider>
      <TableComponent planetsData={planetsData} />
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

describe("TableComponent tests", () => {
  const planetsData: PlanetData[] = [
    {
      id: 1,
      name: "test-name-1",
      climate: "test-climate-1",
      diameter: "test-diameter-1",
      population: "test-population-1",
      favorite: false,
    },
    {
      id: 2,
      name: "test-name-2",
      climate: "test-climate-2",
      diameter: "test-diameter-2",
      population: "test-population-2",
      favorite: false,
    },
  ];

  it("renders TableComponent", () => {
    getRender({ planetsData });

    expect(screen.getByTestId("table-component")).toBeDefined();
  });

  it("renders TableComponent, clicks on Diameter column header to sort table list based on ascending order", () => {
    const planetsDataForDiameter: PlanetData[] = JSON.parse(
      JSON.stringify(planetsData)
    );
    planetsDataForDiameter[0].diameter = "50";
    planetsDataForDiameter[1].diameter = "25";

    getRender({ planetsData: planetsDataForDiameter });

    fireEvent.click(screen.getByTestId("table-header-component-Diameter"));

    expect(
      screen.getAllByTestId("table-record-component-diameter-column")[0]
    ).toHaveTextContent(planetsDataForDiameter[1].diameter);
    expect(
      screen.getAllByTestId("table-record-component-diameter-column")[1]
    ).toHaveTextContent(planetsDataForDiameter[0].diameter);
  });

  it("renders TableComponent, clicks on Population column header to sort table list based on ascending order", () => {
    const planetsDataForPopulation: PlanetData[] = JSON.parse(
      JSON.stringify(planetsData)
    );
    planetsDataForPopulation[0].population = "50";
    planetsDataForPopulation[1].population = "25";

    getRender({ planetsData: planetsDataForPopulation });

    fireEvent.click(screen.getByTestId("table-header-component-Population"));

    expect(
      screen.getAllByTestId("table-record-component-population-column")[0]
    ).toHaveTextContent(planetsDataForPopulation[1].population);
    expect(
      screen.getAllByTestId("table-record-component-population-column")[1]
    ).toHaveTextContent(planetsDataForPopulation[0].population);
  });
});
