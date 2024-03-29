import { PlanetDetailComponentProps } from "./PlanetDetailComponent.props";

export default function PlanetDetailComponent({
  planetDetailData,
}: PlanetDetailComponentProps) {
  return (
    <div
      className="planet-detail-component"
      data-testid="planet-detail-component"
    >
      <span
        className="planet-detail-component__title"
        data-testid="planet-detail-component-name"
      >
        {planetDetailData.name}
      </span>
      <div className="planet-detail-component__content">
        <span
          className="planet-detail-component__content--climate"
          data-testid="planet-detail-component-climate"
        >
          Climate: {planetDetailData.climate}
        </span>
        <span
          className="planet-detail-component__content--gravity"
          data-testid="planet-detail-component-gravity"
        >
          Gravity: {planetDetailData.gravity}
        </span>
      </div>
    </div>
  );
}
