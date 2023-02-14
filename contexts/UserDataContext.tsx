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

const UserDataContext = createContext({});

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }: ProviderProps) => {
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [handleNotificationClick, setHandleNotificationClick] = useState(false);
  const [trendingComment, setTrendingComment] = useState("");
  const { currentUser }: any = useAuth();

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
    favoriteCoins,
    setFavoriteCoins,
    notifications,
    setNotifications,
    handleNotificationClick,
    setHandleNotificationClick,
    trendingComment,
    setTrendingComment,
  };
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
