import PlanetsComponent from "./components/PlanetsComponent/PlanetsComponent";

export default function Home() {
  return (
    <main className="page" data-testid="page-class">
      <PlanetsComponent planetsData={[]} favortiePlanetsData={[]} />
    </main>
  );
}
