"use client";

import { useMemo, useState } from "react";
import { StoreCoin } from "../../../(pages)/favorites/FavoriteCoins";
import { useCoinsStore } from "../../../../src/CoinsStore";
import FilterBtns from "./FilterBtns";
import FilteredCoin from "./FilteredCoin";
import SearchCoins from "./SearchCoins";

const CoinsTableList = () => {
  const [filter, setFilter] = useState<string>("market_cap");
  const [search, setSearch] = useState("");

  const storeCoins: StoreCoin[] = useCoinsStore.getState().coins;

  const sortList = (a: any, b: any) => {
    if (filter === "+") {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    } else if (filter === "-") {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    }
    return b[filter] - a[filter];
  };

  const filteredCoins = useMemo(() => {
    return [...storeCoins]
      .sort((a, b) => sortList(a, b))
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeCoins, search, filter]);

  return (
    <main>
      <section className="relative flex flex-col items-center">
        <FilterBtns filter={filter} setFilter={setFilter} />
        <SearchCoins search={search} setSearch={setSearch} />
      </section>
      <div className="flex mt-[4.2rem] md:mt-10 mb-8 px-1 xs:px-2">
        <ol className="w-full space-y-1 mx-[14px] xs:mx-4">
          <li className="text-[0.85rem] text-gray-500 grid grid-cols-5 cursor-pointer rounded-md px-1 py-1">
            <span className="col-span-2">coin</span>
            <span className="text-right hidden md:inline-block">price</span>
            <span className="text-right col-span-3 md:col-span-1">24h</span>
            <span className="text-right hidden md:inline-block">
              market cap
            </span>
          </li>
          {filteredCoins.length > 0 &&
            filteredCoins.map((coin) => (
              <FilteredCoin key={coin.id} coin={coin} />
            ))}
        </ol>
      </div>
    </main>
  );
};

export default CoinsTableList;
