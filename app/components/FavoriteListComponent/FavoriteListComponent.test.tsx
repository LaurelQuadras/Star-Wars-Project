import { RenderResult, render, screen } from "@testing-library/react";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import FavoriteListComponent from "./FavoriteListComponent";
import { FavoriteListComponentProps } from "./FavoriteListComponent.props";

const getRender = ({
  favortiePlanetsData,
  openRemoveModal,
}: FavoriteListComponentProps): RenderResult => {
  return render(
    <FavoriteListComponent
      favortiePlanetsData={favortiePlanetsData}
      openRemoveModal={openRemoveModal}
    />
  );
};

describe("FavoriteListComponent tests", () => {
  const favortiePlanetsData: PlanetDetailData[] = [
    {
      name: "test-name",
      climate: "test-climate",
      gravity: "test-gravity",
      terrain: "test-terrain",
    },
    {
      name: "test-name",
      climate: "test-climate",
      gravity: "test-gravity",
      terrain: "test-terrain",
    },
  ];
  const openRemoveModal = jest.fn();

  it("renders FavoriteListComponent", () => {
    getRender({ favortiePlanetsData, openRemoveModal });

    expect(screen.getByTestId("favorite-list-component")).toBeDefined();
  });

  it("renders FavoriteListComponent with no favorite vehicles", () => {
    const favortiePlanetsData: PlanetDetailData[] = [];
    getRender({ favortiePlanetsData, openRemoveModal });

    expect(
      screen.getByTestId("favorite-list-component-no-favorites")
    ).toBeDefined();
  });
});
