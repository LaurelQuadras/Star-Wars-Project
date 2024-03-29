import { useEffect, useState } from "react";
import { PlanetData } from "@/app/models/planetData";
import { PlanetStoreInfo } from "@/app/models/reducerModels";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getFavoritesList,
  updateFavoriteList,
} from "@/lib/reducers/planetReducer";
import { FavoriteIconComponentProps } from "./FavoriteIconComponent.props";

export default function FavoriteIconComponent({
  planetData,
}: FavoriteIconComponentProps) {
  const dispatch = useAppDispatch();
  const favoritePlanetStoreList: PlanetStoreInfo[] =
    useAppSelector(getFavoritesList);

  const [planet, setPlanet] = useState<PlanetData>(planetData);

  const onFavoriteIconClick = (): void => {
    setPlanet({ ...planet, favorite: !planet.favorite });
    dispatch(
      updateFavoriteList({
        id: planet.id,
        name: planet.name,
      })
    );
  };

  useEffect(() => {
    if (
      favoritePlanetStoreList
        .map(
          (favoritePlanetStoreValue: PlanetStoreInfo) =>
            favoritePlanetStoreValue.id
        )
        .includes(planet.id)
    ) {
      setPlanet({ ...planet, favorite: !planet.favorite });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="favorite-icon-component"
      onClick={(e) => {
        e.stopPropagation();
        onFavoriteIconClick();
      }}
      data-testid="favorite-icon-component"
    >
      <picture>
        <img
          src={`/icons/${
            planet.favorite ? "starIconChecked" : "starIconUnchecked"
          }.svg`}
          alt="favorite-icon"
          data-testid="favorite-icon-component-icon"
        />
      </picture>
    </div>
  );
}
