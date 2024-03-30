import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface ContentComponentProps {
  planetsData: PlanetData[];
  favoritePlanetsData: PlanetDetailData[];
  navOptionSelected: NavigationOptions;
  planetDetailData?: PlanetDetailData;
  openRemoveModal: (_planetName: string) => void;
}
