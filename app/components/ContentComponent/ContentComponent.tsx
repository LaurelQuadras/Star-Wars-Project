"use client";

import { ReactNode } from "react";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import { ContentComponentProps } from "./ContentComponent.props";
import FavoriteListComponent from "../FavoriteListComponent/FavoriteListComponent";
import PlanetDetailComponent from "../PlanetDetailComponent/PlanetDetailComponent";
import TableComponent from "../TableComponent/TableComponent";

export default function ContentComponent({
  planetsData,
  favoritePlanetsData,
  navOptionSelected,
  planetDetailData,
  openRemoveModal,
}: ContentComponentProps) {
  //This method is used to show the appropriate UI based on the url of the browser.
  const renderPageContent = (): ReactNode => {
    return navOptionSelected === NavigationOptions.Planets ? (
      <TableComponent planetsData={planetsData} />
    ) : navOptionSelected === NavigationOptions.Favorites ? (
      <FavoriteListComponent
        favoritePlanetsData={favoritePlanetsData}
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

  // When the user does not enter /planets, /planets/:id, /favorites route, then they would see the below content.
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
      {planetDetailData && (
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
