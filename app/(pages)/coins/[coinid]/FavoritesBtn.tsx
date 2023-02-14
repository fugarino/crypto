"use client";

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../../contexts/AuthContext";
import { useUserData } from "../../../../contexts/UserDataContext";
import { db } from "../../../../firebase";

const FavoritesBtn = ({ coin }: any) => {
  const { currentUser }: any = useAuth();
  const { favoriteCoins }: any = useUserData();

  const inFavorites = favoriteCoins && favoriteCoins.includes(coin?.id);

  const addToFavorites = async () => {
    const coinRef = doc(db, "users", currentUser.uid);
    try {
      await setDoc(
        coinRef,
        {
          favoriteCoins: favoriteCoins
            ? [...favoriteCoins, coin?.id]
            : [coin?.id],
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async () => {
    const coinRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(coinRef, {
        favoriteCoins: favoriteCoins.filter((watch: any) => watch !== coin?.id),
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
