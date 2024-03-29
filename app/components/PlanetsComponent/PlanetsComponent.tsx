"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import { useAppDispatch } from "@/lib/hooks";
import { removePlanetFromFavorite as removePlanetFromFavoriteRedux } from "@/lib/reducers/favoriteReducer";
import { PlanetsComponentProps } from "./PlanetsComponent.props";
import ContentComponent from "../ContentComponent/ContentComponent";
import PopUpModalComponent from "../PopUpModalComponent/PopUpModalComponent";
import SideNavigationComponent from "../SideNavigationComponent/SideNavigationComponent";

export default function PlanetsComponent({
  planetsData,
  favortiePlanetsData,
  planetId,
}: PlanetsComponentProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [removePlanetName, setRemovePlanetName] = useState<string>("");
  const [navOptionSelected, setNavOptionSelected] = useState<NavigationOptions>(
    NavigationOptions.None
  );
  const [favoritesPlanetsList, setFavoritePlanetsList] =
    useState<PlanetDetailData[]>(favortiePlanetsData);

  useEffect(() => {
    if (pathname.includes("/planets")) {
      setNavOptionSelected(NavigationOptions.Planets);
    } else if (pathname === "/favorites") {
      setNavOptionSelected(NavigationOptions.Favorites);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFavoritePlanetsList(favortiePlanetsData);
  }, [favortiePlanetsData]);

  const removePlanetFromFavorite = (): void => {
    const newFavoritePlanetsList: PlanetDetailData[] =
      favoritesPlanetsList.filter(
        (planet: PlanetDetailData) => planet.name !== removePlanetName
      );

    setFavoritePlanetsList(newFavoritePlanetsList);
    dispatch(removePlanetFromFavoriteRedux(removePlanetName));
    setIsRemoveModalOpen(false);
    setRemovePlanetName("");
  };

  const openRemoveModal = (planetName: string): void => {
    setRemovePlanetName(planetName);
    setIsRemoveModalOpen(true);
  };

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
          favortiePlanetsData={favoritesPlanetsList}
          navOptionSelected={navOptionSelected}
          planetId={planetId}
          openRemoveModal={openRemoveModal}
        />
      </div>
      {isRemoveModalOpen ? (
        <PopUpModalComponent
          setIsRemoveModalOpen={setIsRemoveModalOpen}
          removePlanetFromFavorite={removePlanetFromFavorite}
        />
      ) : null}
    </div>
  );
}
