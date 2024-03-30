import { getPlanets, getPlanetDataById } from "@/app/api/apiRoutes";
import PlanetsComponent from "@/app/components/PlanetsComponent/PlanetsComponent";
import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";

export default async function Home({
  params: { planetId },
}: {
  params: { planetId: number };
}) {
  const planetsData: PlanetData[] = await getPlanets();
  const planetDetailData: PlanetDetailData = await getPlanetDataById(planetId);
  return (
    <main className="page" data-testid="planets-detail-page">
      <PlanetsComponent
        planetsData={planetsData}
        planetDetailData={planetDetailData}
        favortiePlanetsData={[]}
      />
    </main>
  );
}
