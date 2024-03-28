import { PlanetData } from "@/app/models/planetData";
import { TableHeaderSortOptions } from "@/app/models/tableHeaderSortOptions";

export interface TableHeaderComponentProps {
  sortPlanetsList: (
    _column: keyof PlanetData,
    _sortOption: TableHeaderSortOptions
  ) => void;
}
