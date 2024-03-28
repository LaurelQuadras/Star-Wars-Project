import { FavoritePlanetData } from "@/app/models/favoritePlanetData";
import FavoriteComponent from "../FavoriteComponent/FavoriteComponent";

export default function FavoriteListComponent() {
  const sampleFavoriteList: FavoritePlanetData[] = [
    {
      name: "Alderaan",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "mountains, grassland",
    },
    {
      name: "Alderaan",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "mountains, grassland",
    },
    {
      name: "Alderaan",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "mountains, grassland",
    },
  ];

  return (
    <div className="favorite-list-component">
      {sampleFavoriteList.map(
        (favoritePlanetData: FavoritePlanetData, index: number) => (
          <div key={index} className="favorite-list-component__record">
            <FavoriteComponent favoritePlanetData={favoritePlanetData} />
          </div>
        )
      )}
    </div>
  );
}
