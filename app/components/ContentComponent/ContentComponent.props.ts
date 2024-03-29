import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface ContentComponentProps {
  planetsData: PlanetData[];
  favortiePlanetsData: PlanetDetailData[];
  navOptionSelected: NavigationOptions;
  planetId?: number;
  openRemoveModal: (_planetName: string) => void;
}
