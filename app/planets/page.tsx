import { getPlanets } from "../api/apiRoutes";
import PlanetsComponent from "../components/PlanetsComponent/PlanetsComponent";
import { PlanetData } from "../models/planetData";

export default async function Home() {
  const planetsData: PlanetData[] = await getPlanets();
  return (
    <main className="page" data-testid="planets-page">
      <PlanetsComponent planetsData={planetsData} favortiePlanetsData={[]} />
    </main>
  );
}
