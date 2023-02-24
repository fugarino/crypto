"use client";

import { StoreCoin } from "../../../(pages)/favorites/FavoriteCoins";

interface ITrendingCoinProps {
  coin: StoreCoin;
  handleCoinClick: (coinId: string, coinPrice: number) => void;
}

const TrendingCoin = ({ coin, handleCoinClick }: ITrendingCoinProps) => {
  return (
    <li className="shrink-0 mr-[12px] last:mr-0" key={coin.id}>
      <div
        className="slide-center h-full flex flex-col justify-between p-6 bg-white
         shadow-md rounded-lg w-[240px] relative cursor-pointer
         border-[2px] border-white transition-colors duration-150 ease-out cardHover"
        onClick={() =>
          handleCoinClick(coin.id.toLowerCase(), coin.current_price)
        }
      >
        <header>
          <div className="flex justify-between">
            <picture>
              <img
                src={coin.image}
                alt="logo"
                className="h-10 w-10 rounded-full"
              />
            </picture>
            <picture>
              <img
                src={
                  coin.price_change_percentage_24h < 0
                    ? "/Untitledchart.svg"
                    : "/ChartAlt.svg"
                }
                alt="current chart"
              />
            </picture>
          </div>
          <h2 className="mt-2">
            {coin.name}
            <span className="ml-1 text-gray-400">/ USD</span>
          </h2>
        </header>
        <section>
          <span
            className={
              coin.price_change_percentage_24h < 0
                ? "text-red-700"
                : "text-green-700"
            }
          >
            {coin.price_change_percentage_24h < 0
              ? coin.price_change_percentage_24h
              : "+" + coin.price_change_percentage_24h}
            %
          </span>
          <h3 className="text-[1.3rem] font-medium">${coin.current_price}</h3>
        </section>
      </div>
    </li>
  );
};

export default TrendingCoin;
