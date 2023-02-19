import React from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { UserDataProvider } from "../../contexts/UserDataContext";
import { useCoinsStore } from "../../src/CoinsStore";
import StoreInitializer from "../components/coins/trending/StoreInitializer";
import Navbar from "../components/navigation/navbar/Navbar";
import "./globals.css";
import ReactQueryWrapper from "./ReactQueryWrapper";

const getCoinsData = async () => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    { next: { revalidate: 10 * (60 * 1000) } }
  );
  return res.json();
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCoinsData();
  useCoinsStore.setState({ coins: data });

  return (
    <html>
      <head />
      <body>
        <AuthProvider>
          <UserDataProvider>
            <StoreInitializer data={data} />
            <Navbar />
            <ReactQueryWrapper>
              <main className="w-full">{children}</main>
            </ReactQueryWrapper>
          </UserDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
