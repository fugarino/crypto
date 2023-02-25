"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useCoinsStore } from "../../../src/CoinsStore";
import CarouselBtns from "../../components/coins/trending/CarouselBtns";
import TrendingCoin from "../../components/coins/trending/TrendingCoin";
import { StoreCoin } from "../favorites/FavoriteCoins";

const SectionCoins = ({ sortMethod }: { sortMethod: string }) => {
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const carousel = useRef<any>(null);
  const router = useRouter();

  const storeCoins = useCoinsStore.getState().coins;

  const helpSort = (a: any, b: any) => {
    if (sortMethod === "+") {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    } else if (sortMethod === "-") {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    }
    return b[sortMethod] - a[sortMethod];
  };

  const trendingCoins: StoreCoin[] | undefined = useMemo(() => {
    if (storeCoins.length > 1) {
      return [...storeCoins]
        .sort((a: StoreCoin, b: StoreCoin) => helpSort(a, b))
        .slice(0, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeCoins]);

  const handleNextClick = () => {
    carousel.current?.scrollBy({ left: 250, behavior: "smooth" });
  };
  const handlePrevClick = () => {
    carousel.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const handleBtns = () => {
    if (carousel.current.scrollLeft === 0) {
      setLeft(true);
    } else {
      setLeft(false);
    }
    if (
      carousel.current.scrollWidth - carousel.current.scrollLeft ===
      carousel.current.clientWidth
    ) {
      setRight(true);
    } else {
      setRight(false);
    }
  };

  const handleCoinClick = (coinId: string) => {
    router.push(`/coins/${coinId}`);
  };

  return (
    <section className="mt-2">
      {storeCoins?.length > 1 && (
        <>
          <div
            onMouseEnter={() => setShowBtns(true)}
            onMouseLeave={() => setShowBtns(false)}
            className="h-[247px] xs:h-[240px] relative overflow-hidden"
          >
            <ul
              ref={carousel}
              onScroll={handleBtns}
              className="flex h-[280px] pb-10 pl-4 xs:pl-8 sm:pl-10 overflow-x-auto"
            >
              {trendingCoins?.map((coin) => (
                <TrendingCoin
                  key={coin.id}
                  coin={coin}
                  handleCoinClick={handleCoinClick}
                />
              ))}
              <li className="shrink-0">
                <div className="slide-center h-full w-[4px] xs:w-[20px] sm:w-[28px] relative"></div>
              </li>
            </ul>
            {showBtns && (
              <CarouselBtns
                left={left}
                right={right}
                handleNextClick={handleNextClick}
                handlePrevClick={handlePrevClick}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SectionCoins;
