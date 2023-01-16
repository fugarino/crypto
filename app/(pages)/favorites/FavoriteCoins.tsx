"use client";

import { useRouter } from "next/navigation";
import { useFavoriteCoins } from "../../../contexts/FavoritesContext";
import styles from "./Favorites.module.css";

const FavoriteCoins = () => {
  const { coins, favoriteCoins }: any = useFavoriteCoins();
  const router = useRouter();

  return (
    <div>
      {coins && favoriteCoins && (
        <div>
          <ul className="grid grid-cols-5 gap-y-3 gap-x-4">
            {coins.map((coin: any) => {
              if (favoriteCoins.includes(coin.id)) {
                return (
                  <li
                    key={coin.name}
                    className="bg-white flex flex-col justify-between h-[225px] rounded-lg shadow-md
                    shrink-0 mt-[2px] mb-2 p-6 outline-[#dedede] hover:outline hover:outline-[2px]
                    hover:outline-[#dedede] hover:bg-[#f9f9f9]
                    transition-colors duration-150 ease-out cursor-pointer"
                    onClick={() => router.push(`/coins/${coin.id}`)}
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
                      <h3 className="text-[1.3rem] font-medium">
                        ${coin.current_price}
                      </h3>
                    </section>
                  </li>
                );
              }
            })}
            <li
              className={`bg-white h-[225px] rounded-lg ${styles.gradient}`}
            ></li>
            <li
              className={`bg-white h-[225px] rounded-lg ${styles.gradient}`}
            ></li>
            <li
              className={`bg-white h-[225px] rounded-lg ${styles.gradient}`}
            ></li>
            <li
              className={`bg-white h-[225px] rounded-lg ${styles.gradient}`}
            ></li>
            <li
              className={`bg-white h-[225px] rounded-lg ${styles.gradient}`}
            ></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FavoriteCoins;
