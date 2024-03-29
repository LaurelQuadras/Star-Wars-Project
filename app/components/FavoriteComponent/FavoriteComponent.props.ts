import { Dispatch, SetStateAction } from "react";
import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface FavoriteComponentProps {
  planetDetailData: PlanetDetailData;
  setIsRemoveModalOpen: Dispatch<SetStateAction<boolean>>;
}
