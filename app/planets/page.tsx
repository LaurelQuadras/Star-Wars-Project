import { getPlanets } from "../api/apiRoutes";
import PlanetsComponent from "../components/PlanetsComponent/PlanetsComponent";
import { NavigationOptions } from "../models/NavigationOptions";
import { PlanetData } from "../models/planetData";

//This route is rendered when the user navigates to /planets url.
export default async function Home() {
  const planetsData: PlanetData[] = await getPlanets();
  return (
    <main className="page" data-testid="planets-page">
      <PlanetsComponent
        planetsData={planetsData}
        favoritePlanetsData={[]}
        navOptionSelected={NavigationOptions.Planets}
      />
    </main>
  );
}
