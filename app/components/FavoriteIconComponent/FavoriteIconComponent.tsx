import { useEffect, useState } from "react";
import { PlanetData } from "@/app/models/planetData";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getFavoritesList,
  updateFavoriteList,
} from "@/lib/reducers/favoriteReducer";
import { FavoriteIconComponentProps } from "./FavoriteIconComponent.props";

export default function FavoriteIconComponent({
  planetData,
}: FavoriteIconComponentProps) {
  const dispatch = useAppDispatch();
  const favoriteIdList: number[] = useAppSelector(getFavoritesList);

  const [planet, setPlanet] = useState<PlanetData>(planetData);

  const onFavoriteIconClick = (): void => {
    setPlanet({ ...planet, favorite: !planet.favorite });
    dispatch(updateFavoriteList(planetData.id));
  };

  useEffect(() => {
    if (favoriteIdList.includes(planet.id)) {
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
    >
      <picture>
        <img
          src={`/icons/${
            planet.favorite ? "starIconChecked" : "starIconUnchecked"
          }.svg`}
          alt="favorite-icon"
        />
      </picture>
    </div>
  );
}
