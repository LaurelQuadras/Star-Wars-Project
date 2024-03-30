"use client";

import { ReactNode } from "react";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import { FavoriteListComponentProps } from "./FavoriteListComponent.props";
import FavoriteComponent from "../FavoriteComponent/FavoriteComponent";

export default function FavoriteListComponent({
  favoritePlanetsData,
  openRemoveModal,
}: FavoriteListComponentProps) {
  //If the user has not selected any favorite planets, then the below content is shown.
  const noFavoritesContent = (): ReactNode => {
    return (
      <span
        className="favorite-list-component__no-favorites"
        data-testid="favorite-list-component-no-favorites"
      >
        No Favorites
      </span>
    );
  };

  return (
    <div
      className="favorite-list-component"
      data-testid="favorite-list-component"
    >
      {favoritePlanetsData.length === 0 ? noFavoritesContent() : null}
      {favoritePlanetsData.map(
        (planetDetaildata: PlanetDetailData, index: number) => (
          <div key={index} className="favorite-list-component__record">
            <FavoriteComponent
              planetDetailData={planetDetaildata}
              openRemoveModal={openRemoveModal}
            />
          </div>
        )
      )}
    </div>
  );
}
