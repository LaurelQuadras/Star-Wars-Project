import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import PopUpModalComponent from "./PopUpModalComponent";
import { PopUpModalComponentProps } from "./PopUpModalComponent.props";

const getRender = ({
  setIsRemoveModalOpen,
  removePlanetFromFavorite,
}: PopUpModalComponentProps): RenderResult => {
  return render(
    <PopUpModalComponent
      setIsRemoveModalOpen={setIsRemoveModalOpen}
      removePlanetFromFavorite={removePlanetFromFavorite}
    />
  );
};

describe("PopUpModalComponent tests", () => {
  const setIsRemoveModalOpen = jest.fn();
  const removePlanetFromFavorite = jest.fn();

  it("renders PopUpModalComponent", () => {
    getRender({ setIsRemoveModalOpen, removePlanetFromFavorite });

    expect(screen.getByTestId("popup-modal-component")).toBeDefined();
  });

  it("renders PopUpModalComponent and clicks outside to close the popup", () => {
    getRender({ setIsRemoveModalOpen, removePlanetFromFavorite });

    fireEvent.click(screen.getByTestId("popup-modal-component"));

    expect(setIsRemoveModalOpen).toHaveBeenCalled();
  });

  it("renders PopUpModalComponent and clicks on close button to close the popup", () => {
    getRender({ setIsRemoveModalOpen, removePlanetFromFavorite });

    fireEvent.click(screen.getByTestId("popup-modal-component-close-button"));

    expect(setIsRemoveModalOpen).toHaveBeenCalled();
  });

  it("renders PopUpModalComponent and clicks on cancel button to close the popup", () => {
    getRender({ setIsRemoveModalOpen, removePlanetFromFavorite });

    fireEvent.click(screen.getByTestId("popup-modal-component-cancel-button"));

    expect(setIsRemoveModalOpen).toHaveBeenCalled();
  });

  it("renders PopUpModalComponent and clicks on remove button to remove the planet from favorites and close the popup", () => {
    getRender({ setIsRemoveModalOpen, removePlanetFromFavorite });

    fireEvent.click(screen.getByTestId("popup-modal-component-remove-button"));

    expect(removePlanetFromFavorite).toHaveBeenCalled();
  });
});
