import { FavoriteComponentProps } from "./FavoriteComponent.props";

export default function FavoriteComponent({
  planetDetailData,
  openRemoveModal,
}: FavoriteComponentProps) {
  return (
    <div className="favorite-component" data-testid="favorite-component">
      <div className="favorite-component__information">
        <div className="favorite-component__information--data">
          <span
            className="favorite-component__information--data-name"
            data-testid="favorite-component-name"
          >
            {planetDetailData.name}
          </span>
          <span
            className="favorite-component__information--data-climate"
            data-testid="favorite-component-climate"
          >
            {planetDetailData.climate}
          </span>
        </div>
        <div
          className="favorite-component__information--remove"
          onClick={() => openRemoveModal(planetDetailData.name)}
          data-testid="favorite-component-remove-button"
        >
          <picture>
            <img src="/icons/removeIcon.svg" alt="remove-icon" />
          </picture>
        </div>
      </div>
      <div className="favorite-component__picture">
        <picture>
          <img
            src="/FavoriteStockImage.png"
            alt="favorites-stock-image"
            className="favorite-component__picture--image"
          />
        </picture>
      </div>
      <div className="favorite-component__content">
        <span
          className="favorite-component__content--terrain"
          data-testid="favorite-component-terrain"
        >
          Climate: {planetDetailData.terrain}
        </span>
        <span
          className="favorite-component__content--gravity"
          data-testid="favorite-component-gravity"
        >
          Gravity{planetDetailData.gravity}
        </span>
      </div>
    </div>
  );
}
