import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface FavoriteListComponentProps {
  favortiePlanetsData: PlanetDetailData[];
  openRemoveModal: (_planetName: string) => void;
}
