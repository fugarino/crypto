"use client";

import { useLayoutEffect, useRef, useState } from "react";
import CarouselBtnL from "./CarouselBtnL";
import CarouselBtnR from "./CarouselBtnR";
import TrendingCoin from "./TrendingCoin";

interface IProps {
  data: any[];
}

const TrendingCoinsList = ({ data }: IProps) => {
  const [margin, setMargin] = useState(0);
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
    <section className="relative mt-14 testing">
      <CarouselBtnL handleClick={handlePrevClick} className="left-12" />
      <ul
        ref={carousel}
        className="flex h-[248px] overflow-x-auto space-x-4 idk"
      >
        {data.map((coin, i) => (
          <TrendingCoin
            key={coin.name}
            i={i}
            margin={margin}
            name={coin.name}
            image={coin.image}
            current_price={coin.current_price}
            price_change_percentage_24h={coin.price_change_percentage_24h}
          />
        ))}
      </ul>
      <CarouselBtnR handleClick={handleNextClick} className="right-12" />
    </section>
  );
};

export default TrendingCoinsList;
