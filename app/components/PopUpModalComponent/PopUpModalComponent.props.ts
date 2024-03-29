import { Dispatch, SetStateAction } from "react";

export interface PopUpModalComponentProps {
  setIsRemoveModalOpen: Dispatch<SetStateAction<boolean>>;
  removePlanetFromFavorite: () => void;
}
