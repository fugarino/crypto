"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { useUserData } from "../../../contexts/UserDataContext";
import { useCoinsStore } from "../../../src/CoinsStore";
import CarouselBtnL from "../../components/coins/trending/CarouselBtnL";
import CarouselBtnR from "../../components/coins/trending/CarouselBtnR";
import TrendingCoin from "../../components/coins/trending/TrendingCoin";

const Test = ({ sortMethod }: any) => {
  const [margin, setMargin] = useState(0);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);
  const { coins }: any = useUserData();
  const router = useRouter();
  const carousel: any = useRef();
  // const [displayCoin, setDisplayCoin] = useState<any>({
  //   coinId: "",
  //   coinPrice: 0,
  // });

  const storeCoins = useCoinsStore.getState().coins;

  const helpSort = (a: any, b: any) => {
    if (sortMethod === "+") {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    } else if (sortMethod === "-") {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    }
    return b[sortMethod] - a[sortMethod];
  };

  const trendingCoins =
    storeCoins && [...storeCoins].sort((a, b) => helpSort(a, b)).slice(0, 10);
  useLayoutEffect(() => {
    const updateSize = () => {
      window.innerWidth > 1400
        ? setMargin((window.innerWidth - 1400) / 2 + 48)
        : setMargin(48);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleNextClick = () => {
    carousel.current.scrollBy({ left: 452, behaviour: "smooth" });
  };
  const handlePrevClick = () => {
    carousel.current.scrollBy({ left: -452, behaviour: "smooth" });
  };

  const handleButtons = (e: any) => {
    carousel.current.firstChild.getBoundingClientRect().x - margin < -1
      ? setLeft(true)
      : setLeft(false);
    carousel.current.lastChild.getBoundingClientRect().right -
      e.target.clientWidth +
      margin <
    1
      ? setRight(false)
      : setRight(true);
  };

  const handleCoinClick = (coin: string) => {
    router.push(`/coins/${coin}`);
  };

  return (
    <section className="mt-1">
      {storeCoins?.length > 1 && (
        <>
          <div className="relative testing">
            {left && (
              <CarouselBtnL handleClick={handlePrevClick} className="left-12" />
            )}
            <ul
              ref={carousel}
              onScroll={(e) => handleButtons(e)}
              className="flex h-[250px] overflow-x-auto space-x-4 idk scroll-smooth"
            >
              {trendingCoins.map((coin: any, i: any) => (
                <TrendingCoin
                  key={coin.name}
                  i={i}
                  id={coin.id}
                  margin={margin}
                  name={coin.name}
                  image={coin.image}
                  current_price={coin.current_price}
                  price_change_percentage_24h={coin.price_change_percentage_24h}
                  handleCoinClick={() => handleCoinClick(coin.id)}
                />
              ))}
            </ul>
            {right && (
              <CarouselBtnR
                handleClick={handleNextClick}
                className="right-12"
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Test;
