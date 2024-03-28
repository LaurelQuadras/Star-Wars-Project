import { getPlanets } from "./api/apiRoutes";
import ContentComponent from "./components/ContentComponent/ContentComponent";
import SideNavigationComponent from "./components/SideNavigationComponent/SideNavigationComponent";
import { PlanetData } from "./models/planetData";

export default async function Home() {
  const planetsData: PlanetData[] = await getPlanets();
  return (
    <main className="page" data-testid="page-class">
      <nav className="page__nav">
        <SideNavigationComponent />
      </nav>
      <div className="page__contents">
        <ContentComponent planetsData={planetsData} />
      </div>
    </main>
  );
}
