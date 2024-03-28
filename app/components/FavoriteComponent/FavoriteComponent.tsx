import { FavoriteComponentProps } from "./FavoriteComponent.props";

export default function FavoriteComponent({
  favoritePlanetData,
}: FavoriteComponentProps) {
  return (
    <div className="favorite-component">
      <div className="favorite-component__information">
        <div className="favorite-component__information--data">
          <span className="favorite-component__information--data-name">
            {favoritePlanetData.name}
          </span>
          <span className="favorite-component__information--data-climate">
            {favoritePlanetData.climate}
          </span>
        </div>
        <div className="favorite-component__information--remove">
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
        <span className="favorite-component__content--terrain">
          Climate: {favoritePlanetData.terrain}
        </span>
        <span className="favorite-component__content--gravity">
          Gravity{favoritePlanetData.gravity}
        </span>
      </div>
    </div>
  );
}
