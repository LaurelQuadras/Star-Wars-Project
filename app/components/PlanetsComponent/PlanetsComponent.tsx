"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetsComponentProps } from "./PlanetsComponent.props";
import ContentComponent from "../ContentComponent/ContentComponent";
import PopUpModalComponent from "../PopUpModalComponent/PopUpModalComponent";
import SideNavigationComponent from "../SideNavigationComponent/SideNavigationComponent";

export default function PlanetsComponent({
  planetsData,
  favortiePlanetsData,
  planetId,
}: PlanetsComponentProps) {
  const pathname = usePathname();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [navOptionSelected, setNavOptionSelected] = useState<NavigationOptions>(
    NavigationOptions.None
  );

  useEffect(() => {
    if (pathname.includes("/planets")) {
      setNavOptionSelected(NavigationOptions.Planets);
    } else if (pathname === "/favorites") {
      setNavOptionSelected(NavigationOptions.Favorites);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="planets-component">
      <nav
        className={`planets-component__${
          isRemoveModalOpen ? "backdrop-nav" : "nav"
        }`}
      >
        <SideNavigationComponent navOptionSelected={navOptionSelected} />
      </nav>
      <div
        className={`planets-component__${
          isRemoveModalOpen ? "backdrop-contents" : "contents"
        }`}
      >
        <ContentComponent
          planetsData={planetsData}
          favortiePlanetsData={favortiePlanetsData}
          setIsRemoveModalOpen={setIsRemoveModalOpen}
          navOptionSelected={navOptionSelected}
          planetId={planetId}
        />
      </div>
      {isRemoveModalOpen ? (
        <PopUpModalComponent setIsRemoveModalOpen={setIsRemoveModalOpen} />
      ) : null}
    </div>
  );
}
