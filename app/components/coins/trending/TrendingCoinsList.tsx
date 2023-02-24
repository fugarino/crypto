"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { StoreCoin } from "../../../(pages)/favorites/FavoriteCoins";
import { useCoinsStore } from "../../../../src/CoinsStore";
import CarouselBtns from "./CarouselBtns";
import TrendingChart from "./TrendingChart";
import TrendingCoin from "./TrendingCoin";

const TrendingCoinsList = () => {
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const carousel = useRef<HTMLUListElement>(null);
  const [displayCoin, setDisplayCoin] = useState({
    coinId: "",
    coinPrice: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const storeCoins = useCoinsStore.getState().coins;

  const trendingCoins: StoreCoin[] | undefined = useMemo(() => {
    if (storeCoins.length > 1) {
      return [...storeCoins]
        .sort(
          (a: StoreCoin, b: StoreCoin) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
        .slice(0, 10);
    }
  }, [storeCoins]);

  const handleNextClick = () => {
    carousel.current?.scrollBy({ left: 250, behavior: "smooth" });
  };
  const handlePrevClick = () => {
    carousel.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const handleBtns = () => {
    if (carousel?.current?.scrollLeft === 0) {
      setLeft(true);
    } else {
      setLeft(false);
    }
    if (
      carousel.current!.scrollWidth - carousel.current!.scrollLeft ===
      carousel.current!.clientWidth
    ) {
      setRight(true);
    } else {
      setRight(false);
    }
  };

  const handleCoinClick = (coinId: string, coinPrice: number) => {
    setDisplayCoin({
      coinId,
      coinPrice,
    });
  };

  return (
    <section className="mt-6 xs:mt-4 sm:mt-8">
      {storeCoins?.length > 1 && (
        <>
          <TrendingChart
            id={displayCoin.coinId || (trendingCoins && trendingCoins[0].id)}
            price={
              displayCoin.coinPrice ||
              (trendingCoins && trendingCoins[0].current_price)!
            }
          />
          <div
            onMouseEnter={() => setShowBtns(true)}
            onMouseLeave={() => setShowBtns(false)}
            className="h-[247px] relative overflow-hidden"
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

export default TrendingCoinsList;
