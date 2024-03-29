import { PlanetData } from "@/app/models/planetData";

export interface PlanetsComponentProps {
  planetsData: PlanetData[];
  planetId?: number;
}
