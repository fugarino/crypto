"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useFavoriteCoins } from "../../../contexts/FavoritesContext";
import CarouselBtnL from "../../components/coins/trending/CarouselBtnL";
import CarouselBtnR from "../../components/coins/trending/CarouselBtnR";
import TrendingCoin from "../../components/coins/trending/TrendingCoin";

const TrendingCoinsList = () => {
  const [margin, setMargin] = useState(0);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);
  const { coins }: any = useFavoriteCoins();
  const carousel: any = useRef();
  const [displayCoin, setDisplayCoin] = useState<any>({
    coinId: "",
    coinPrice: 0,
  });

  const trendingCoins = [...coins]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 10);

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

  const handleCoinClick = (coinId: string, coinPrice: number) => {
    setDisplayCoin({
      coinId,
      coinPrice,
    });
  };

  return (
    <section className="mt-1">
      {coins.length > 1 && (
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
                  handleCoinClick={handleCoinClick}
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

export default TrendingCoinsList;
