import { getPlanets } from "@/app/api/apiRoutes";
import PlanetsComponent from "@/app/components/PlanetsComponent/PlanetsComponent";
import { PlanetData } from "@/app/models/planetData";

export default async function Page({
  params: { planetId },
}: {
  params: { planetId: number };
}) {
  const planetsData: PlanetData[] = await getPlanets();
  return (
    <main className="page" data-testid="page-class">
      <PlanetsComponent planetsData={planetsData} planetId={planetId} />
    </main>
  );
}
