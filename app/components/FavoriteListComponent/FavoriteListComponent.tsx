"use client";

import { ReactNode } from "react";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import { FavoriteListComponentProps } from "./FavoriteListComponent.props";
import FavoriteComponent from "../FavoriteComponent/FavoriteComponent";

export default function FavoriteListComponent({
  favortiePlanetsData,
  openRemoveModal,
}: FavoriteListComponentProps) {
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
      {favortiePlanetsData.length === 0 ? noFavoritesContent() : null}
      {favortiePlanetsData.map(
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
