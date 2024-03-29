import { Dispatch, SetStateAction } from "react";
import { PlanetData } from "@/app/models/planetData";

export interface ContentComponentProps {
  planetsData: PlanetData[];
  setIsRemoveModalOpen: Dispatch<SetStateAction<boolean>>;
}
