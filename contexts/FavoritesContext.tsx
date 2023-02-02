"use client";

import { collection, doc, onSnapshot } from "firebase/firestore";
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
  const [notifications, setNotifications] = useState<any[]>([]);
  const [handleNotificationClick, setHandleNotificationClick] = useState(false);
  const { currentUser }: any = useAuth();

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const data = await res.json();
      setCoins(data);
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const coinRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setFavoriteCoins(coin.data().favoriteCoins);
        } else {
          console.log("No items in watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        collection(db, "users", currentUser.uid, "notifications"),
        (snapshot) => {
          setNotifications(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  const value = {
    coins,
    setCoins,
    favoriteCoins,
    setFavoriteCoins,
    notifications,
    setNotifications,
    handleNotificationClick,
    setHandleNotificationClick,
  };
  return (
    <FavoriteCoinsContext.Provider value={value}>
      {children}
    </FavoriteCoinsContext.Provider>
  );
};
