"use client";

import { useFavoriteCoins } from "../../../contexts/FavoritesContext";

const FavoriteCoins = () => {
  const { coins, favoriteCoins }: any = useFavoriteCoins();

  return (
    <div>
      {favoriteCoins &&
        coins.map((coin: any) => {
          if (favoriteCoins.includes(coin.id)) {
            return (
              <div key={coin.name}>
                {coin.name} {coin.current_price}
              </div>
            );
          }
        })}
    </div>
  );
};

export default FavoriteCoins;
