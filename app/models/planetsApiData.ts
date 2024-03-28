import { PlanetsResultApiData } from "./planetsResultApiData";

export type PlanetsApiData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetsResultApiData[];
};
