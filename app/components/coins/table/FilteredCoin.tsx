"use client";

import { useRouter } from "next/navigation";
import { StoreCoin } from "../../../(pages)/favorites/FavoriteCoins";

const FilteredCoin = ({ coin }: { coin: StoreCoin }) => {
  const router = useRouter();

  const ToMillions = (num: number) => {
    return num.toString().slice(0, -6) + "M";
  };

  return (
    <li
      className="grid grid-cols-5 cursor-pointer hover:bg-[#e0dddb]
                rounded-md px-1 py-1"
      onClick={() => router.push(`/coins/${coin.id}`)}
    >
      <div className="flex items-center col-span-3 xs:col-span-2">
        <picture>
          <img src={coin.image} alt={coin.name} className="h-10 w-10" />
        </picture>
        <span className="ml-4">{coin.name}</span>
      </div>
      <span className="items-center justify-end hidden md:flex">
        ${coin.current_price}
      </span>
      <span
        className={`${
          coin.price_change_percentage_24h < 0
            ? "text-red-700"
            : "text-green-700"
        } flex items-center justify-end col-span-2 xs:col-span-3 md:col-span-1`}
      >
        {coin.price_change_percentage_24h > 0
          ? "+" + coin.price_change_percentage_24h
          : coin.price_change_percentage_24h}
        %
      </span>
      <span className="hidden md:flex lg:hidden items-center justify-end">
        {ToMillions(coin.market_cap)}
      </span>
      <span className="hidden lg:flex items-center justify-end">
        {coin.market_cap}
      </span>
    </li>
  );
};

export default FilteredCoin;
