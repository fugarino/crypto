"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

const TrendingCoinsContext = createContext({});

export const useTrendingCoins = () => {
  return useContext(TrendingCoinsContext);
};

export const TrendingCoinsProvider = ({ children }: ProviderProps) => {
  const [currentCoin, setCurrentCoin] = useState({
    id: "",
    price: 0,
  });

  const handleCoinClick = (id: any, price: any) => {
    setCurrentCoin({
      id: id,
      price: price,
    });
  };

  const value = { currentCoin, setCurrentCoin, handleCoinClick };
  return (
    <TrendingCoinsContext.Provider value={value}>
      {children}
    </TrendingCoinsContext.Provider>
  );
};
