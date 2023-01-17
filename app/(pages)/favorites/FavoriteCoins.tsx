"use client";

import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useFavoriteCoins } from "../../../contexts/FavoritesContext";
import { db } from "../../../firebase";
import styles from "./Favorites.module.css";

const FavoriteCoins = () => {
  const { currentUser }: any = useAuth();
  const [edit, setEdit] = useState(false);
  const { coins, favoriteCoins }: any = useFavoriteCoins();
  const router = useRouter();

  const removeFromFavorites = async (id: any) => {
    const coinRef = doc(db, "watchlist", currentUser.uid);
    try {
      await updateDoc(coinRef, {
        coins: favoriteCoins.filter((watch: any) => watch !== id),
      });
    } catch (error) {
      console.log(error);
    }
    setEdit(false);
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <div
            className={`absolute right-0 -top-10 flex items-center justify-center w-9 h-9
      rounded-full hover:bg-[#d7d7d7] cursor-pointer`}
            onClick={() => setEdit((prevState) => !prevState)}
          >
            {!edit ? (
              <picture>
                <img src="/Edit_filledit.svg" alt="edit" />
              </picture>
            ) : (
              <picture>
                <img src="/Close_roundx.svg" alt="edit" />
              </picture>
            )}
          </div>
          {coins && (
            <div>
              <ul className="grid grid-cols-5 gap-y-3 gap-x-4">
                {coins.map((coin: any) => {
                  if (favoriteCoins.includes(coin.id)) {
                    return (
                      <li
                        key={coin.name}
                        className={`relative bg-white flex flex-col justify-between h-[225px] rounded-lg shadow-md
                    shrink-0 mt-[2px] mb-2 p-6 cursor-pointer hover:outline hover:outline-[2px] ${
                      !edit
                        ? "outline-[#dedede] hover:outline-[#dedede] hover:bg-[#f9f9f9]"
                        : "outline-[#d2a0a0] hover:outline-[#d2a0a0] hover:bg-[#f2e5e5]"
                    }
                    transition-colors duration-150 ease-out`}
                        onClick={() =>
                          !edit
                            ? router.push(`/coins/${coin.id}`)
                            : removeFromFavorites(coin.id)
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
      ) : (
        <div>
          <ul className="grid grid-cols-5 gap-y-3 gap-x-4">
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
          <div className="flex items-center justify-center mt-4 space-x-2">
            <span className="text-[#c2bbb4]">sign in to access</span>
            <picture>
              <img src="/Sign_in_squresi.svg" alt="sign in" />
            </picture>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteCoins;
