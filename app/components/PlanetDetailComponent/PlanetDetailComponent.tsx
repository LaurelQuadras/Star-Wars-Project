import { PlanetDetailComponentProps } from "./PlanetDetailComponent.props";

export default function PlanetDetailComponent({
  planetDetailData,
}: PlanetDetailComponentProps) {
  return (
    <div className="planet-detail-component">
      <span className="planet-detail-component__title">
        {planetDetailData.name}
      </span>
      <div className="planet-detail-component__content">
        <span className="planet-detail-component__content--climate">
          Climate: {planetDetailData.climate}
        </span>
        <span className="planet-detail-component__content--gravity">
          Gravity: {planetDetailData.gravity}
        </span>
      </div>
    </div>
  );
}
