"use client";

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../../contexts/AuthContext";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";
import { db } from "../../../../firebase";

const FavoritesBtn = ({ coin }: any) => {
  const { currentUser }: any = useAuth();
  const { favoriteCoins }: any = useFavoriteCoins();

  const inFavorites = favoriteCoins.includes(coin?.id);

  const addToFavorites = async () => {
    const coinRef = doc(db, "watchlist", currentUser.uid);
    try {
      await setDoc(coinRef, {
        coins: favoriteCoins ? [...favoriteCoins, coin?.id] : [coin?.id],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async () => {
    const coinRef = doc(db, "watchlist", currentUser.uid);
    try {
      await updateDoc(coinRef, {
        coins: favoriteCoins.filter((watch: any) => watch !== coin?.id),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUser && (
        <button
          className="absolute -top-7 right-2"
          onClick={inFavorites ? removeFromFavorites : addToFavorites}
        >
          {inFavorites ? (
            <picture>
              <img src="/Bookmark_fillyo.svg" alt="remove from favorites" />
            </picture>
          ) : (
            <picture>
              <img src="/Bookmarkyi.svg" alt="add to favorites" />
            </picture>
          )}
        </button>
      )}
    </>
  );
};

export default FavoritesBtn;
