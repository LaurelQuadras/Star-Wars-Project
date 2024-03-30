import PlanetsComponent from "./components/PlanetsComponent/PlanetsComponent";
import { NavigationOptions } from "./models/NavigationOptions";

/*
This route is rendered when the user navigates to the default "/" url. This route is also rendered as a result of redirect function invoked by not-found.tsx which handles the route for all invalid urls (Other than /planets, /planets/:id or /favorites).
*/
export default function Home() {
  return (
    <main className="page" data-testid="page-class">
      <PlanetsComponent
        planetsData={[]}
        favoritePlanetsData={[]}
        navOptionSelected={NavigationOptions.None}
      />
    </main>
  );
}
