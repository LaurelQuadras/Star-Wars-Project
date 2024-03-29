import { Dispatch, SetStateAction } from "react";
import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface FavoriteListComponentProps {
  setIsRemoveModalOpen: Dispatch<SetStateAction<boolean>>;
  favortiePlanetsData: PlanetDetailData[];
}
