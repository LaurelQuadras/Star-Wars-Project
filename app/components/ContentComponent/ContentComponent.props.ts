import { Dispatch, SetStateAction } from "react";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetData } from "@/app/models/planetData";

export interface ContentComponentProps {
  planetsData: PlanetData[];
  setIsRemoveModalOpen: Dispatch<SetStateAction<boolean>>;
  navOptionSelected: NavigationOptions;
  planetId?: number;
}
