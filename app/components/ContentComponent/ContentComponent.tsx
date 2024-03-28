"use client";

import { useState } from "react";
import { getPlanetDataById } from "@/app/api/apiRoutes";
import { PlanetData } from "@/app/models/planetData";
import { PlanetDetailData } from "@/app/models/planetDetailData";
import { ContentComponentProps } from "./ContentComponent.props";
import FavoriteListComponent from "../FavoriteListComponent/FavoriteListComponent";
import PlanetDetailComponent from "../PlanetDetailComponent/PlanetDetailComponent";
import TableComponent from "../TableComponent/TableComponent";

export default function ContentComponent({
  planetsData,
}: ContentComponentProps) {
  const [planetDetailData, setPlanetDetailData] = useState<PlanetDetailData>();

  const onTableRecordClick = (planetName: string): void => {
    const planetSelected: PlanetData = planetsData.filter(
      (planetData: PlanetData) => planetData.name === planetName
    )[0];
    const planetIndex: number = planetsData.indexOf(planetSelected);
    getPlanetDetailData(planetIndex);
  };

  const getPlanetDetailData = async (planetIndex: number): Promise<void> => {
    const planetDetailData: PlanetDetailData = await getPlanetDataById(
      planetIndex + 1
    );
    setPlanetDetailData(planetDetailData);
  };

  return (
    <div className="content-component">
      <div className="content-component__data">
        <span className="content-component__data__text">Planets</span>
        <TableComponent
          planetsData={planetsData}
          onTableRecordClick={onTableRecordClick}
        />
        {/* <FavoriteListComponent /> */}
      </div>
      {planetDetailData && (
        <div className="content-component__detail">
          <PlanetDetailComponent planetDetailData={planetDetailData} />
        </div>
      )}
    </div>
  );
}
