import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface FavoriteListComponentProps {
  favoritePlanetsData: PlanetDetailData[];
  openRemoveModal: (_planetName: string) => void;
}
