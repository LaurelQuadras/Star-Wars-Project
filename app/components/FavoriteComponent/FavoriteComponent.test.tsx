import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import FavoriteComponent from "./FavoriteComponent";
import { FavoriteComponentProps } from "./FavoriteComponent.props";

const getRender = ({
  planetDetailData,
  openRemoveModal,
}: FavoriteComponentProps): RenderResult => {
  return render(
    <FavoriteComponent
      planetDetailData={planetDetailData}
      openRemoveModal={openRemoveModal}
    />
  );
};

describe("FavoriteComponent tests", () => {
  const planetDetailData: PlanetDetailData = {
    name: "test-name",
    climate: "test-climate",
    gravity: "test-gravity",
    terrain: "test-terrain",
  };
  const openRemoveModal = jest.fn();

  it("renders FavoriteComponent", () => {
    getRender({ planetDetailData, openRemoveModal });

    expect(screen.getByTestId("favorite-component")).toBeDefined();
  });

  it("renders FavoriteComponent and clicks on remove planet from favorites button", () => {
    getRender({ planetDetailData, openRemoveModal });

    fireEvent.click(screen.getByTestId("favorite-component-remove-button"));

    expect(openRemoveModal).toHaveBeenCalled();
  });

  it("renders FavoriteComponent and contains all the necessary content", () => {
    getRender({ planetDetailData, openRemoveModal });

    expect(screen.getByTestId("favorite-component-name")).toHaveTextContent(
      planetDetailData.name
    );
    expect(screen.getByTestId("favorite-component-climate")).toHaveTextContent(
      planetDetailData.climate
    );
    expect(screen.getByTestId("favorite-component-terrain")).toHaveTextContent(
      planetDetailData.terrain
    );
    expect(screen.getByTestId("favorite-component-gravity")).toHaveTextContent(
      planetDetailData.gravity
    );
  });
});
