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

interface IUserData {
  favoriteCoins: string[];
  setFavoriteCoins: React.Dispatch<React.SetStateAction<string[]>>;
  notifications: { id: string; data: any }[];
  setNotifications: React.Dispatch<
    React.SetStateAction<{ id: string; data: any }[]>
  >;
  handleNotificationClick: string;
  setHandleNotificationClick: React.Dispatch<React.SetStateAction<string>>;
  trendingComment: string;
  setTrendingComment: React.Dispatch<React.SetStateAction<string>>;
}

const UserDataContext = createContext<IUserData>({} as IUserData);

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }: ProviderProps) => {
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: string; data: any }[]
  >([]);
  const [handleNotificationClick, setHandleNotificationClick] = useState("");
  const [trendingComment, setTrendingComment] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const coinRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setFavoriteCoins(coin.data().favoriteCoins);
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
