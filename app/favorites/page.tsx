"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { getFavoritesList } from "@/lib/reducers/favoriteReducer";
import { getPlanetDataById } from "../api/apiRoutes";
import PlanetsComponent from "../components/PlanetsComponent/PlanetsComponent";
import { PlanetDetailData } from "../models/planetDetailData";

export default function Home() {
  const favoriteIdList: number[] = useAppSelector(getFavoritesList);
  const [favoritePlanetDetailsData, setFavoritePlanetDetailsData] = useState<
    PlanetDetailData[]
  >([]);

  useEffect(() => {
    fetchPlanetsData(favoriteIdList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteIdList]);

  const fetchPlanetsData = async (favoriteIdList: number[]) => {
    const favoritePlanetList: PlanetDetailData[] = [];

    for (const favoriteId of favoriteIdList) {
      const planetDetailData: PlanetDetailData = await getPlanetDataById(
        favoriteId
      );
      favoritePlanetList.push(planetDetailData);
    }

    setFavoritePlanetDetailsData(favoritePlanetList);
  };

  return (
    <main className="page" data-testid="page-class">
      <PlanetsComponent
        planetsData={[]}
        favortiePlanetsData={favoritePlanetDetailsData}
      />
    </main>
  );
}
