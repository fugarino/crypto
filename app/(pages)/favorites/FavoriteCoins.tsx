"use client";

import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUserData } from "../../../contexts/UserDataContext";
import { db } from "../../../firebase";
import { useCoinsStore } from "../../../src/CoinsStore";
import EditBtn from "./EditBtn";
import FavoriteCoin from "./FavoriteCoin";
import Filler from "./Filler";

export interface StoreCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
}

const FavoriteCoins = () => {
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { favoriteCoins } = useUserData();

  const storeCoins = useCoinsStore.getState().coins;

  const removeFromFavorites = async (coin: StoreCoin) => {
    if (currentUser) {
      setError("");
      const coinRef = doc(db, "users", currentUser.uid);
      try {
        await updateDoc(coinRef, {
          favoriteCoins: favoriteCoins.filter(
            (favoriteCoin) => favoriteCoin !== coin?.id
          ),
        });
      } catch {
        setError(`Unable to remove ${coin.name}`);
      }
      setEdit(false);
    }
  };

  return (
    <section>
      <span className="inline-block text-red-400 text-[0.9rem]">{error}</span>
      {currentUser ? (
        <div>
          <EditBtn edit={edit} setEdit={setEdit} />
          {storeCoins && (
            <div>
              <ul className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg1:grid-cols-5 gap-y-1 xs:gap-y-2 sm:gap-y-3 gap-x-4 mb-6">
                {storeCoins.map((coin: StoreCoin) => {
                  if (favoriteCoins && favoriteCoins.includes(coin.id)) {
                    return (
                      <FavoriteCoin
                        key={coin.id}
                        coin={coin}
                        edit={edit}
                        removeFromFavorites={removeFromFavorites}
                      />
                    );
                  }
                })}
                <Filler />
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <ul className="grid grid-cols-5 gap-y-3 gap-x-4">
            <Filler />
          </ul>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <span className="text-[#c2bbb4]">sign in to access</span>
            <picture>
              <img src="/Sign_in_squresi.svg" alt="sign in" />
            </picture>
          </div>
        </div>
      )}
    </section>
  );
};

export default FavoriteCoins;
