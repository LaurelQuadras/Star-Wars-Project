"use client";

import { useState } from "react";
import { PlanetComponentProps } from "./PlanetsComponent.props";
import ContentComponent from "../ContentComponent/ContentComponent";
import PopUpModalComponent from "../PopUpModalComponent/PopUpModalComponent";
import SideNavigationComponent from "../SideNavigationComponent/SideNavigationComponent";

export default function PlanetComponent({ planetsData }: PlanetComponentProps) {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);

  return (
    <div className="planets-component">
      <nav
        className={`planets-component__${
          isRemoveModalOpen ? "backdrop-nav" : "nav"
        }`}
      >
        <SideNavigationComponent />
      </nav>
      <div
        className={`planets-component__${
          isRemoveModalOpen ? "backdrop-contents" : "contents"
        }`}
      >
        <ContentComponent
          planetsData={planetsData}
          setIsRemoveModalOpen={setIsRemoveModalOpen}
        />
      </div>
      {isRemoveModalOpen ? (
        <PopUpModalComponent setIsRemoveModalOpen={setIsRemoveModalOpen} />
      ) : null}
    </div>
  );
}
