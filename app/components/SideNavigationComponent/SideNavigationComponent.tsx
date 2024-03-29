import Link from "next/link";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { SideNavigationComponentProps } from "./SideNavigationComponent.props";

export default function SideNavigationComponent({
  navOptionSelected,
}: SideNavigationComponentProps) {
  return (
    <div className="side-navigation-component">
      <span className="side-navigation-component__title">PlanetsApp</span>
      <Link href="/planets">
        <button
          className={`side-navigation-component__button${
            navOptionSelected === NavigationOptions.Planets ? "--selected" : ""
          }`}
        >
          <span className="side-navigation-component__button--text">
            Planets
          </span>
        </button>
      </Link>
      <Link href="/favorites">
        <button
          className={`side-navigation-component__button${
            navOptionSelected === NavigationOptions.Favorites
              ? "--selected"
              : ""
          }`}
        >
          <span className="side-navigation-component__button--text">
            Favorites
          </span>
        </button>
      </Link>
    </div>
  );
}
