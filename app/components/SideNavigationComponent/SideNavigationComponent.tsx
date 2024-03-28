export default function SideNavigationComponent() {
  return (
    <div className="side-navigation-component">
      <span className="side-navigation-component__title">PlanetsApp</span>
      <button className="side-navigation-component__button">
        <span className="side-navigation-component__button--text">Planets</span>
      </button>
      <button className="side-navigation-component__button">
        <span className="side-navigation-component__button--text">
          Favorites
        </span>
      </button>
    </div>
  );
}
