import ContentComponent from "./components/ContentComponent/ContentComponent";
import SideNavigationComponent from "./components/SideNavigationComponent/SideNavigationComponent";

export default function Home() {
  return (
    <main className="page" data-testid="page-class">
      <nav className="page__nav">
        <SideNavigationComponent />
      </nav>
      <div className="page__contents">
        <ContentComponent />
      </div>
    </main>
  );
}
