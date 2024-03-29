import { Dispatch, SetStateAction } from "react";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface ContentComponentProps {
  planetsData: PlanetData[];
  favortiePlanetsData: PlanetDetailData[];
  setIsRemoveModalOpen: Dispatch<SetStateAction<boolean>>;
  navOptionSelected: NavigationOptions;
  planetId?: number;
}
