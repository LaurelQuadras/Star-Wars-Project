import { RenderResult, render, screen } from "@testing-library/react";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import FavoriteListComponent from "./FavoriteListComponent";
import { FavoriteListComponentProps } from "./FavoriteListComponent.props";

const getRender = ({
  favoritePlanetsData,
  openRemoveModal,
}: FavoriteListComponentProps): RenderResult => {
  return render(
    <FavoriteListComponent
      favoritePlanetsData={favoritePlanetsData}
      openRemoveModal={openRemoveModal}
    />
  );
};

describe("FavoriteListComponent tests", () => {
  const favoritePlanetsData: PlanetDetailData[] = [
    {
      name: "test-name-1",
      climate: "test-climate-1",
      gravity: "test-gravity-1",
      terrain: "test-terrain-1",
    },
    {
      name: "test-name-2",
      climate: "test-climate-2",
      gravity: "test-gravity-2",
      terrain: "test-terrain-2",
    },
  ];
  const openRemoveModal = jest.fn();

  it("renders FavoriteListComponent", () => {
    getRender({ favoritePlanetsData, openRemoveModal });

    expect(screen.getByTestId("favorite-list-component")).toBeDefined();
  });

  it("renders FavoriteListComponent with no favorite vehicles", () => {
    const favoritePlanetsData: PlanetDetailData[] = [];
    getRender({ favoritePlanetsData, openRemoveModal });

    expect(
      screen.getByTestId("favorite-list-component-no-favorites")
    ).toBeDefined();
  });
});
