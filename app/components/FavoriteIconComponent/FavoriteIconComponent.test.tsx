import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { PlanetData } from "@/app/models/planetData";
import StoreProvider from "@/app/StoreProvider";
import FavoriteIconComponent from "./FavoriteIconComponent";
import { FavoriteIconComponentProps } from "./FavoriteIconComponent.props";

const getRender = ({
  planetData,
}: FavoriteIconComponentProps): RenderResult => {
  return render(
    <StoreProvider>
      <FavoriteIconComponent planetData={planetData} />
    </StoreProvider>
  );
};

describe("FavoriteIconComponent tests", () => {
  const planetData: PlanetData = {
    id: 1,
    name: "test-name",
    climate: "test-climate",
    diameter: "test-diameter",
    population: "test-population",
    favorite: false,
  };

  it("renders FavoriteIconComponent", () => {
    getRender({ planetData });

    expect(screen.getByTestId("favorite-icon-component")).toBeDefined();
  });

  it("renders FavoriteIconComponent for favorite as false and clicks on favorite icon to toggle favorite status", () => {
    getRender({ planetData });

    fireEvent.click(screen.getByTestId("favorite-icon-component"));

    expect(screen.getByTestId("favorite-icon-component-icon")).toHaveAttribute(
      "src",
      "/icons/starIconChecked.svg"
    );
  });

  it("renders FavoriteIconComponent for favorite as true and clicks on favorite icon to toggle favorite status", () => {
    const planetDataForFavoriteAsTrue: PlanetData = JSON.parse(
      JSON.stringify(planetData)
    );
    planetDataForFavoriteAsTrue.favorite = true;

    getRender({ planetData: planetDataForFavoriteAsTrue });

    fireEvent.click(screen.getByTestId("favorite-icon-component"));

    expect(screen.getByTestId("favorite-icon-component-icon")).toHaveAttribute(
      "src",
      "/icons/starIconUnchecked.svg"
    );
  });
});
