import { PlanetData } from "@/app/models/planetData";

export interface TableComponentProps {
  planetsData: PlanetData[];
  onTableRecordClick: (_planetName: string) => void;
}
