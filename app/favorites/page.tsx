"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { getFavoritesList } from "@/lib/reducers/planetReducer";
import { getPlanetDataById } from "../api/apiRoutes";
import PlanetsComponent from "../components/PlanetsComponent/PlanetsComponent";
import { PlanetDetailData } from "../models/planetDetailData";
import { PlanetStoreInfo } from "../models/reducerModels";

export default function Home() {
  const favoritePlanetStoreList: PlanetStoreInfo[] =
    useAppSelector(getFavoritesList);
  const [favoritePlanetDetailsData, setFavoritePlanetDetailsData] = useState<
    PlanetDetailData[]
  >([]);

  useEffect(() => {
    fetchPlanetsData(favoritePlanetStoreList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritePlanetStoreList]);

  const fetchPlanetsData = async (favoriteIdList: PlanetStoreInfo[]) => {
    const favoritePlanetList: PlanetDetailData[] = [];

    for (const planetStoreValue of favoriteIdList) {
      const planetDetailData: PlanetDetailData = await getPlanetDataById(
        planetStoreValue.id
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
