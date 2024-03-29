"use client";

import { ReactNode, useEffect, useState } from "react";
import { getPlanetDataById } from "@/app/api/apiRoutes";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import { ContentComponentProps } from "./ContentComponent.props";
import FavoriteListComponent from "../FavoriteListComponent/FavoriteListComponent";
import PlanetDetailComponent from "../PlanetDetailComponent/PlanetDetailComponent";
import TableComponent from "../TableComponent/TableComponent";

export default function ContentComponent({
  planetsData,
  favortiePlanetsData,
  navOptionSelected,
  planetId,
  openRemoveModal,
}: ContentComponentProps) {
  const [planetDetailData, setPlanetDetailData] = useState<PlanetDetailData>({
    name: "",
    climate: "",
    gravity: "",
    terrain: "",
  });

  useEffect(() => {
    planetId && getPlanetDetailData(planetId);
  }, [planetId]);

  const getPlanetDetailData = async (planetIndex: number): Promise<void> => {
    const planetDetailData: PlanetDetailData = await getPlanetDataById(
      planetIndex
    );
    setPlanetDetailData(planetDetailData);
  };

  const renderPageContent = (): ReactNode => {
    return navOptionSelected === NavigationOptions.Planets ? (
      <TableComponent planetsData={planetsData} />
    ) : navOptionSelected === NavigationOptions.Favorites ? (
      <FavoriteListComponent
        favortiePlanetsData={favortiePlanetsData}
        openRemoveModal={openRemoveModal}
      />
    ) : (
      renderHomePage()
    );
  };

  const renderPageTitle = (): string => {
    return navOptionSelected === NavigationOptions.Planets
      ? "Planets"
      : navOptionSelected === NavigationOptions.Favorites
      ? "Favorites"
      : "";
  };

  const renderHomePage = (): ReactNode => {
    return (
      <span
        className="content-component__home-page"
        data-testid="content-component-data"
      >
        Please select any of the Navigation Options on the left side
      </span>
    );
  };

  return (
    <div className="content-component" data-testid="content-component">
      <div className="content-component__data">
        <span
          className="content-component__data__text"
          data-testid="content-component-title"
        >
          {renderPageTitle()}
        </span>
        {renderPageContent()}
      </div>
      {planetId && (
        <div
          className="content-component__detail"
          data-testid="content-component-detail"
        >
          <PlanetDetailComponent planetDetailData={planetDetailData} />
        </div>
      )}
    </div>
  );
}
