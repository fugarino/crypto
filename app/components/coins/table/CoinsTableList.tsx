"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";

const CoinsTableList = () => {
  // const [coinsList, setCoinsList] = useState<any[]>([]);
  const { coins, favoriteCoins }: any = useFavoriteCoins();
  const [filter, setFilter] = useState("market_cap");
  const [search, setSearch] = useState("");
  const { currentUser }: any = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   setCoins(data);
  // }, [data]);

  const sortList = (a: any, b: any) => {
    if (filter === "+") {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    } else if (filter === "-") {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    }
    return b[filter] - a[filter];
  };

  return (
    <section className="px-12 max-w-[1400px] mx-auto">
      <header className="mt-1 ml-6">
        <h1 className="font-bold text-[1.5rem]">Search</h1>
        <h2 className="relative -top-2 text-[#67676d]">top cryptocurrencies</h2>
      </header>
      <div className="flex items-center h-[4rem] px-[2rem] bg-white rounded-lg shadow-md">
        <div className="flex justify-center w-[5%] text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          placeholder="Search coins..."
          className="h-full w-[90%] outline-none text-[1rem]"
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-gray-400 text-sm">/ USD</span>
      </div>
      <ul className="flex justify-center space-x-16 text-[#67676d] text-[0.9rem] mt-4">
        <li
          className={`rounded-[4px] cursor-pointer px-4 py-1 ${
            filter === "market_cap" && "bg-[#e0dddb] text-black"
          }`}
          onClick={() => setFilter("market_cap")}
        >
          Market cap
        </li>
        <li
          className={`rounded-[4px] cursor-pointer px-4 py-1 ${
            filter === "circulating_supply" && "bg-[#e0dddb] text-black"
          }`}
          onClick={() => setFilter("circulating_supply")}
        >
          Supply
        </li>
        <li
          className={`rounded-[4px] cursor-pointer px-4 py-1 ${
            filter === "current_price" && "bg-[#e0dddb] text-black"
          }`}
          onClick={() => setFilter("current_price")}
        >
          Price
        </li>
        <li
          className={`rounded-[4px] cursor-pointer px-4 py-1 ${
            filter === "+" && "bg-[#e0dddb] text-black"
          }`}
          onClick={() => setFilter("+")}
        >
          + 24h
        </li>
        <li
          className={`rounded-[4px] cursor-pointer px-4 py-1 ${
            filter === "-" && "bg-[#e0dddb] text-black"
          }`}
          onClick={() => setFilter("-")}
        >
          - 24h
        </li>
      </ul>
      <div className="flex mt-10">
        <ol className="w-[80%] space-y-1 mr-10">
          {[...coins]
            .sort((a, b) => sortList(a, b))
            .filter(
              (coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
            )
            .map((coin) => (
              <li
                key={coin.name}
                className="grid grid-cols-4 cursor-pointer hover:bg-[#e0dddb]
                rounded-md px-1 py-1"
                onClick={() => router.push(`/coins/${coin.id}`)}
              >
                <div className="flex items-center">
                  <picture>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-10 w-10"
                    />
                  </picture>
                  <span className="ml-4">{coin.name}</span>
                </div>
                <span className="flex items-center justify-end">
                  ${coin.current_price}
                </span>
                <span className="flex items-center justify-end">
                  {coin.price_change_percentage_24h > 0
                    ? "+" + coin.price_change_percentage_24h
                    : coin.price_change_percentage_24h}
                  %
                </span>
                <span className="flex items-center justify-end">
                  {coin.market_cap}
                </span>
              </li>
            ))}
        </ol>
        <div className="flex">
          <div className="bg-[#D0CAC5] w-[2px] mt-10 max-h-[1008px]"></div>
          <div className="ml-10">
            <h3 className="font-bold text-[1.4rem] mb-2">Favorites</h3>
            {currentUser ? (
              <ul className="space-y-4">
                {coins.map((coin: any) => {
                  if (favoriteCoins && favoriteCoins.includes(coin.id)) {
                    return (
                      <Link key={coin.name} href={`/coins/${coin.id}`}>
                        <li
                          className="bg-white flex flex-col justify-between h-[225px] w-[240px] rounded-lg shadow-md
                    shrink-0 mt-[2px] mb-2 p-6 outline-[#dedede] hover:outline hover:outline-[2px]
                    hover:outline-[#dedede] hover:bg-[#f9f9f9]
                    transition-colors duration-150 ease-out cursor-pointer"
                          // onClick={() => router.push(`/coins/${coin.id}`)}
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
                      </Link>
                    );
                  }
                })}
              </ul>
            ) : (
              <div className="flex flex-col items-center">
                <ul className="w-[240px] space-y-4">
                  <li className={`bg-white h-[225px] rounded-lg gradient`}></li>
                  <li className={`bg-white h-[225px] rounded-lg gradient`}></li>
                </ul>
                <div className="flex mt-4 space-x-2">
                  <span className="text-[#c2bbb4]">sign in to access</span>
                  <picture>
                    <img src="/Sign_in_squresi.svg" alt="sign in" />
                  </picture>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinsTableList;
