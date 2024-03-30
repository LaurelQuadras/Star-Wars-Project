import { PlanetData } from "@/app/models/planetData";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";
import { filterSortPlanetsList } from "./filterSortPlanetsList";

describe("FilterSortPlanetList tests", () => {
  it("sorts the PlanetData list based on ascending diameter column and returns the list", () => {
    const planetsData: PlanetData[] = [
      {
        id: 1,
        name: "test-name-1",
        climate: "test-climate-1",
        diameter: "50",
        population: "test-population-1",
        favorite: false,
      },
      {
        id: 2,
        name: "test-name-2",
        climate: "test-climate-2",
        diameter: "25",
        population: "test-population-2",
        favorite: false,
      },
    ];
    const column: keyof PlanetData = "diameter";
    const sortOption: TableHeaderSortOptions = TableHeaderSortOptions.asc;

    const result: PlanetData[] = filterSortPlanetsList(
      planetsData,
      column,
      sortOption
    );

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(1);
  });

  it("sorts the PlanetData list based on descending diameter column and returns the list", () => {
    const planetsData: PlanetData[] = [
      {
        id: 1,
        name: "test-name-1",
        climate: "test-climate-1",
        diameter: "20",
        population: "test-population-1",
        favorite: false,
      },
      {
        id: 2,
        name: "test-name-2",
        climate: "test-climate-2",
        diameter: "50",
        population: "test-population-2",
        favorite: false,
      },
    ];
    const column: keyof PlanetData = "diameter";
    const sortOption: TableHeaderSortOptions = TableHeaderSortOptions.desc;

    const result: PlanetData[] = filterSortPlanetsList(
      planetsData,
      column,
      sortOption
    );

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(1);
  });

  it("sorts the PlanetData list based on ascending population column with undefined values and returns the list", () => {
    const planetsData: PlanetData[] = [
      {
        id: 1,
        name: "test-name-1",
        climate: "test-climate-1",
        diameter: "test-diameter",
        population: "50",
        favorite: false,
      },
      {
        id: 2,
        name: "test-name-2",
        climate: "test-climate-2",
        diameter: "test-diameter",
        population: "unknown",
        favorite: false,
      },
      {
        id: 3,
        name: "test-name-2",
        climate: "test-climate-2",
        diameter: "test-diameter",
        population: "25",
        favorite: false,
      },
    ];
    const column: keyof PlanetData = "population";
    const sortOption: TableHeaderSortOptions = TableHeaderSortOptions.asc;

    const result: PlanetData[] = filterSortPlanetsList(
      planetsData,
      column,
      sortOption
    );

    expect(result[0].id).toBe(3);
    expect(result[1].id).toBe(1);
    expect(result[2].id).toBe(2);
  });

  it("sorts the PlanetData list based on descending population column with undefined values and returns the list", () => {
    const planetsData: PlanetData[] = [
      {
        id: 1,
        name: "test-name-1",
        climate: "test-climate-1",
        diameter: "test-diameter",
        population: "25",
        favorite: false,
      },
      {
        id: 2,
        name: "test-name-2",
        climate: "test-climate-2",
        diameter: "test-diameter",
        population: "unknown",
        favorite: false,
      },
      {
        id: 3,
        name: "test-name-2",
        climate: "test-climate-2",
        diameter: "test-diameter",
        population: "50",
        favorite: false,
      },
    ];
    const column: keyof PlanetData = "population";
    const sortOption: TableHeaderSortOptions = TableHeaderSortOptions.desc;

    const result: PlanetData[] = filterSortPlanetsList(
      planetsData,
      column,
      sortOption
    );

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(3);
    expect(result[2].id).toBe(1);
  });
});
