"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { getFavoritesList } from "@/lib/reducers/planetReducer";
import { getPlanetDataById } from "../api/apiRoutes";
import PlanetsComponent from "../components/PlanetsComponent/PlanetsComponent";
import { NavigationOptions } from "../models/NavigationOptions";
import { PlanetDetailData } from "../models/planetDetailData";
import { PlanetStoreInfo } from "../models/reducerModels";

//This route is rendered when the user navigates to /favorites url.
export default function Home() {
  const favoritePlanetStoreList: PlanetStoreInfo[] =
    useAppSelector(getFavoritesList);
  const [favoritePlanetDetailsData, setFavoritePlanetDetailsData] = useState<
    PlanetDetailData[]
  >([]);

  /**
   * Here, we execute the method fetchPlanetsData and pass the list of key value pair of planetId and planetName which the user has marked as favorite (from redux store) as params.
   */
  useEffect(() => {
    fetchPlanetsData(favoritePlanetStoreList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritePlanetStoreList]);

  /**
   * Here, for every planet which the user has marked as favorite, we make an api call to fetch it's detail information which like climate, gravity and terrain which is shown in the Favorite Card UI.
   * @param favoriteIdList
   */
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
    <main className="page" data-testid="favorites-page">
      <PlanetsComponent
        planetsData={[]}
        favoritePlanetsData={favoritePlanetDetailsData}
        navOptionSelected={NavigationOptions.Favorites}
      />
    </main>
  );
}
