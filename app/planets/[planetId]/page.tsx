import { getPlanets } from "@/app/api/apiRoutes";
import PlanetsComponent from "@/app/components/PlanetsComponent/PlanetsComponent";
import { PlanetData } from "@/app/models/planetData";

export default async function Home({
  params: { planetId },
}: {
  params: { planetId: number };
}) {
  const planetsData: PlanetData[] = await getPlanets();
  return (
    <main className="page" data-testid="planets-detail-page">
      <PlanetsComponent
        planetsData={planetsData}
        planetId={planetId}
        favortiePlanetsData={[]}
      />
    </main>
  );
}
