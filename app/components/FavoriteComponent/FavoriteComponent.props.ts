import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface FavoriteComponentProps {
  planetDetailData: PlanetDetailData;
  openRemoveModal: (_planetName: string) => void;
}
