"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";

const CoinsTableList = () => {
  // const [coinsList, setCoinsList] = useState<any[]>([]);
  const { coins }: any = useFavoriteCoins();
  const [filter, setFilter] = useState("market_cap");
  const [search, setSearch] = useState("");
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
        <h1 className="font-bold text-[1.5rem]">Cryptocurrencies</h1>
        <h2 className="relative -top-2 text-[#67676d]">
          share your thoughts on the top coins
        </h2>
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
        <ol className="w-[80%] space-y-1 pr-10">
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
            <ul className="space-y-4">
              <li className="bg-white h-[240px] w-[240px] rounded-lg shadow-md"></li>
              <li className="bg-white h-[240px] w-[240px] rounded-lg shadow-md"></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinsTableList;
