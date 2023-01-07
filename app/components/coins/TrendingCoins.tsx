"use client";

import { useLayoutEffect, useRef, useState } from "react";

// const getData = async (currency: string) => {
//   const res = await fetch(
//     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
//     { next: { revalidate: 60 } }
//   );
//   return res.json();
// };

const dummySlides = [
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 },
  { name: 6 },
  { name: 7 },
  { name: 8 },
  { name: 9 },
  { name: 10 },
];

const TrendingCoins = () => {
  // const data: any[] = await getData("USD");
  const [margin, setMargin] = useState(0);
  const carousel: any = useRef();

  useLayoutEffect(() => {
    const updateSize = () => {
      calculatePadding(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const calculatePadding = (screenSize: number) => {
    screenSize > 1400 ? setMargin((screenSize - 1400) / 2 + 48) : setMargin(48);
  };

  const handleNextClick = () => {
    // carousel.scrollBy(100, 0);
    carousel.current.scrollBy({ left: 452, behaviour: "smooth" });
  };
  const handlePrevClick = () => {
    // carousel.scrollBy(100, 0);
    carousel.current.scrollBy({ left: -452, behaviour: "smooth" });
  };

  // if screenSize > 1400
  // margin left and right = (screenSize - 1400) / 2
  // else
  // margin left and right = 14

  return (
    <section className="relative mt-14 mb-14">
      {/* {data.map((coin) => (
        <div key={coin.name}>
          <picture>
            <img src={coin.image} alt="logo" />
          </picture>
          <h1>{coin.symbol.toUpperCase()} / USD</h1>
          <span
            className={
              coin.price_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {coin.price_change_percentage_24h}%
          </span>
          <h2>${coin.current_price}</h2>
        </div>
      ))} */}
      <button onClick={handleNextClick}>next</button>
      <button onClick={handlePrevClick}>prev</button>
      <ul
        ref={carousel}
        className="flex h-[248px] overflow-x-auto space-x-4 idk"
      >
        {dummySlides.map((slide, i) => (
          <li
            key={slide.name}
            style={{
              marginLeft: i === 0 ? margin : 0,
              marginRight: i === 9 ? margin : 12,
            }}
            className="bg-white w-[240px] rounded-lg shadow-md shrink-0 mb-2"
          >
            {slide.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingCoins;
