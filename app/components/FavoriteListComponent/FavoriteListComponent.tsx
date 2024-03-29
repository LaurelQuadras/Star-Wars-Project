"use client";

import { ReactNode } from "react";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import { FavoriteListComponentProps } from "./FavoriteListComponent.props";
import FavoriteComponent from "../FavoriteComponent/FavoriteComponent";

export default function FavoriteListComponent({
  setIsRemoveModalOpen,
  favortiePlanetsData,
}: FavoriteListComponentProps) {
  const noFavoritesContent = (): ReactNode => {
    return (
      <span className="favorite-list-component__no-favorites">
        No Favorites
      </span>
    );
  };

  return (
    <div className="favorite-list-component">
      {favortiePlanetsData.length === 0 ? noFavoritesContent() : null}
      {favortiePlanetsData.map(
        (planetDetaildata: PlanetDetailData, index: number) => (
          <div key={index} className="favorite-list-component__record">
            <FavoriteComponent
              planetDetailData={planetDetaildata}
              setIsRemoveModalOpen={setIsRemoveModalOpen}
            />
          </div>
        )
      )}
    </div>
  );
}
