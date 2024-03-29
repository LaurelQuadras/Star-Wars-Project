import { RenderResult, render, screen } from "@testing-library/react";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import PlanetDetailComponent from "./PlanetDetailComponent";
import { PlanetDetailComponentProps } from "./PlanetDetailComponent.props";

const getRender = ({
  planetDetailData,
}: PlanetDetailComponentProps): RenderResult => {
  return render(<PlanetDetailComponent planetDetailData={planetDetailData} />);
};

describe("PlanetDetailComponent tests", () => {
  const planetDetailData: PlanetDetailData = {
    name: "test-name",
    climate: "test-climate",
    gravity: "test-gravity",
    terrain: "test-terrain",
  };

  it("renders PlanetDetailComponent", () => {
    getRender({ planetDetailData });

    expect(screen.getByTestId("planet-detail-component")).toBeDefined();
  });

  it("renders PlanetDetailComponent and displays it's contents", () => {
    getRender({ planetDetailData });

    expect(
      screen.getByTestId("planet-detail-component-name")
    ).toHaveTextContent(planetDetailData.name);
    expect(
      screen.getByTestId("planet-detail-component-climate")
    ).toHaveTextContent(planetDetailData.climate);
    expect(
      screen.getByTestId("planet-detail-component-gravity")
    ).toHaveTextContent(planetDetailData.gravity);
  });
});
