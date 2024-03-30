import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";

export interface PlanetsComponentProps {
  planetsData: PlanetData[];
  favoritePlanetsData: PlanetDetailData[];
  planetDetailData?: PlanetDetailData;
}
