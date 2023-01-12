"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ICoinsTableListProps {
  data: any[];
}

const CoinsTableList = ({ data }: ICoinsTableListProps) => {
  const [coinsList, setCoinsList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCoinsList(data);
  }, [data]);

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
      <ul className="flex justify-center space-x-16 text-[#67676d] text-[0.9rem] mt-3">
        <li className="bg-[#d2d0cd] text-black rounded-[4px] px-4 py-1">
          Market cap
        </li>
        <li className="px-4 py-1">24h Volume</li>
        <li className="px-4 py-1">Price</li>
        <li className="px-4 py-1">Biggest Gains</li>
        <li className="px-4 py-1">Biggest Losses</li>
      </ul>
      <ol className="p-8 bg-white mt-4 rounded-lg shadow-md">
        {coinsList
          .filter(
            (coin) =>
              coin.name.toLowerCase().includes(search.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(search.toLowerCase())
          )
          .map((coin) => (
            <li
              key={coin.name}
              className="flex items-center justify-between"
              onClick={() => router.push(`/coins/${coin.id}`)}
            >
              <picture>
                <img src={coin.image} alt={coin.name} className="h-10 w-10" />
              </picture>
              <span>{coin.name}</span>
              <span>${coin.current_price}</span>
              <span>
                {coin.price_change_percentage_24h > 0
                  ? "+" + coin.price_change_percentage_24h
                  : coin.price_change_percentage_24h}
              </span>
              <span>{coin.market_cap}</span>
            </li>
          ))}
      </ol>
    </section>
  );
};

export default CoinsTableList;
