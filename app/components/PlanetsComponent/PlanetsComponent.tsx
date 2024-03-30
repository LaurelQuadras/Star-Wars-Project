"use client";

import { useEffect, useState } from "react";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import { useAppDispatch } from "@/lib/hooks";
import { removePlanetFromFavorite as removePlanetFromFavoriteRedux } from "@/lib/reducers/planetReducer";
import { PlanetsComponentProps } from "./PlanetsComponent.props";
import ContentComponent from "../ContentComponent/ContentComponent";
import PopUpModalComponent from "../PopUpModalComponent/PopUpModalComponent";
import SideNavigationComponent from "../SideNavigationComponent/SideNavigationComponent";

export default function PlanetsComponent({
  planetsData,
  favoritePlanetsData,
  planetDetailData,
  navOptionSelected,
}: PlanetsComponentProps) {
  const dispatch = useAppDispatch();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [removePlanetName, setRemovePlanetName] = useState<string>("");
  const [favoritesPlanetsList, setFavoritePlanetsList] =
    useState<PlanetDetailData[]>(favoritePlanetsData);

  useEffect(() => {
    setFavoritePlanetsList(favoritePlanetsData);
  }, [favoritePlanetsData]);

  /**This method is used to remove a planet from the favorite list and update the Favorite List in the UI, when the user clicks on Remove button in the Remove PopUp Modal. It dispatches an action to redux store to remove that planet from the redux favorites list. It also closes the modal and clears the removePlanetName state since that planet is not present in the UI anymore.
   */
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

  //This method is invoked when user clicks on the remove button of a Planet in a Favorite Card. It opensthe Remove PopUp Modal and stores the selected planet name in the state: removePlanetName, which is then used to sucessfully remove the planet from the Favorite List if the user chooses.
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
          favoritePlanetsData={favoritesPlanetsList}
          navOptionSelected={navOptionSelected}
          planetDetailData={planetDetailData}
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
