"use client";

import { PlanetDetailData } from "@/app/models/planetDetailData";
import { FavoriteListComponentProps } from "./FavoriteListComponent.props";
import FavoriteComponent from "../FavoriteComponent/FavoriteComponent";

export default function FavoriteListComponent({
  setIsRemoveModalOpen,
}: FavoriteListComponentProps) {
  const sampleFavoriteList: PlanetDetailData[] = [
    {
      name: "Alderaan",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "mountains, grassland",
    },
    {
      name: "Alderaan",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "mountains, grassland",
    },
    {
      name: "Alderaan",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "mountains, grassland",
    },
  ];

  return (
    <div className="favorite-list-component">
      {sampleFavoriteList.map(
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
