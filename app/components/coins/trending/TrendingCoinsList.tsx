"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTrendingCoins } from "../../../../contexts/TrendingCoinsContext";
import CarouselBtnL from "./CarouselBtnL";
import CarouselBtnR from "./CarouselBtnR";
import TrendingChart from "./TrendingChart";
import TrendingCoin from "./TrendingCoin";

interface IProps {
  data: any[];
}

const TrendingCoinsList = ({ data }: IProps) => {
  const [margin, setMargin] = useState(0);
  const { currentCoin }: any = useTrendingCoins();
  const carousel: any = useRef();

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

  return (
    <section className="mt-10">
      <TrendingChart
        id={currentCoin.id || data[0].id}
        price={currentCoin.price || data[0].current_price}
      />
      <div className="relative testing">
        <CarouselBtnL handleClick={handlePrevClick} className="left-12" />
        <ul
          ref={carousel}
          className="flex h-[256px] overflow-x-auto space-x-4 idk"
        >
          {data.map((coin, i) => (
            <TrendingCoin
              key={coin.name}
              i={i}
              id={coin.id}
              margin={margin}
              name={coin.name}
              image={coin.image}
              current_price={coin.current_price}
              price_change_percentage_24h={coin.price_change_percentage_24h}
            />
          ))}
        </ul>
        <CarouselBtnR handleClick={handleNextClick} className="right-12" />
      </div>
    </section>
  );
};

export default TrendingCoinsList;
