import { useRouter } from "next/navigation";
import { StoreCoin } from "./FavoriteCoins";

const FavoriteCoin = ({
  coin,
  edit,
  removeFromFavorites,
}: {
  coin: StoreCoin;
  edit: boolean;
  removeFromFavorites: (coin: StoreCoin) => Promise<void>;
}) => {
  const router = useRouter();

  return (
    <li
      key={coin.name}
      className={`relative bg-white flex flex-col justify-between h-[225px] rounded-lg shadow-md
                    shrink-0 mt-[2px] mb-2 p-6 cursor-pointer hover:outline hover:outline-[2px] ${
                      !edit
                        ? "outline-[#dedede] hover:outline-[#dedede] hover:bg-[#f9f9f9]"
                        : "outline-[#d2a0a0] hover:outline-[#d2a0a0] hover:bg-[#f2e5e5]"
                    }
                    transition-colors duration-150 ease-out`}
      onClick={() =>
        !edit ? router.push(`/coins/${coin.id}`) : removeFromFavorites(coin)
      }
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
        <h3 className="text-[1.3rem] font-medium">${coin.current_price}</h3>
      </section>
    </li>
  );
};

export default FavoriteCoin;
