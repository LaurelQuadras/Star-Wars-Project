import { PlanetData } from "@/app/models/planetData";

export interface TableComponentProps {
  planetsData: PlanetData[];
  tableHeaderColumns: string[];
}
