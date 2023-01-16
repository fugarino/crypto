"use client";

import { useFavoriteCoins } from "../../../contexts/FavoritesContext";

const FavoriteCoins = () => {
  const { coins, favoriteCoins }: any = useFavoriteCoins();

  return (
    <div>
      {coins && favoriteCoins && (
        <div>
          {coins.map((coin: any) => {
            if (favoriteCoins.includes(coin.id)) {
              return (
                <div key={coin.name}>
                  <picture>
                    <img src={coin.image} alt="coin logo" />
                  </picture>
                  {coin.name} {coin.current_price}{" "}
                  {coin.price_change_percentage_24h}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default FavoriteCoins;

// on coins page -> filter favorites based of coins fetch
// on favorites page -> if coins available filter based of coins fetch, otherwise fetch favorites with favorite coins
