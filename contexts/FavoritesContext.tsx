"use client";

import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

interface ProviderProps {
  children: ReactNode;
}

const FavoriteCoinsContext = createContext({});

export const useFavoriteCoins = () => {
  return useContext(FavoriteCoinsContext);
};

export const FavoriteCoinsProvider = ({ children }: ProviderProps) => {
  const [coins, setCoins] = useState([]);
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const { currentUser }: any = useAuth();

  useEffect(() => {
    if (currentUser) {
      const coinRef = doc(db, "watchlist", currentUser.uid);

      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setFavoriteCoins(coin.data().coins);
        } else {
          console.log("No items in watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  const value = { coins, setCoins, favoriteCoins, setFavoriteCoins };
  return (
    <FavoriteCoinsContext.Provider value={value}>
      {children}
    </FavoriteCoinsContext.Provider>
  );
};
