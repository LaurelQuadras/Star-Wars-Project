import { PlanetData } from "@/app/models/planetData";

export interface TableRecordComponentProps {
  planetData: PlanetData;
  onTableRecordClick: (_planetName: string) => void;
}
