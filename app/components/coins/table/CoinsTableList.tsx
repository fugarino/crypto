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
    <>
      <div>
        <input
          type="text"
          value={search}
          placeholder="search coins..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ol>
        {coinsList
          .filter(
            (coin) =>
              coin.name.toLowerCase().includes(search.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(search.toLowerCase())
          )
          .map((coin) => (
            <li
              key={coin.name}
              className="flex items-center space-x-6"
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
    </>
  );
};

export default CoinsTableList;
