// @ts-nocheck

"use client";

import { useQuery } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import ReactHtmlParser from "react-html-parser";
import styles from "./CoinInfo.module.css";
import FavoritesBtn from "./FavoritesBtn";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CoinInfoProps {
  id: string;
}

const CoinInfo = ({ id }: CoinInfoProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: coinInfo } = useQuery({
    queryKey: ["info", id],
    queryFn: () =>
      fetch(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) =>
        res.json()
      ),
    staleTime: 10 * (60 * 1000),
  });

  const data = {
    labels: [
      coinInfo?.market_data.max_supply === null
        ? "unlimited supply"
        : "circulating supply",
      "supply left",
    ],
    datasets: [
      {
        label:
          coinInfo?.market_data.max_supply === null ? "circulating supply" : "",
        data: [
          coinInfo?.market_data.circulating_supply,
          coinInfo?.market_data.max_supply === null ||
          coinInfo?.market_data.max_supply === undefined
            ? 0
            : coinInfo?.market_data.max_supply -
              coinInfo?.market_data.circulating_supply,
        ],
        backgroundColor: ["#e6e6e6", "#f4f4f4"],
        borderColor: ["#fff", "#fff"],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <section className="relative p-6 xs:p-10 h-full">
      <FavoritesBtn coin={coinInfo} />
      {coinInfo && (
        <main className="flex flex-col justify-between h-full">
          <div className="flex justify-between">
            <div className="flex flex-col font-bold text-[3.5rem] text-[#989898] xs:text-[5rem]">
              <h3 className="flex space-x-2 md:space-x-0 lg:space-x-2">
                <span className="text-[0.9rem] xs:hidden sm:flex md:hidden lg:flex">
                  Rank:
                </span>
                <span className="leading-[3.1rem]">
                  {coinInfo.market_cap_rank < 10
                    ? "0" + coinInfo.market_cap_rank
                    : coinInfo.market_cap_rank}
                </span>
              </h3>
            </div>
            <div>
              <div className="flex justify-between">
                <div></div>
                <div className="font-bold text-[2rem] ml-2 xs:text-[3rem] md:text-[2rem] lg:text-[3rem] leading-[1.8rem] xs:leading-[2rem] w-full break-words">
                  $
                  {coinInfo.market_data.current_price["usd"]
                    .toString()
                    .slice(0, 7)}
                </div>
              </div>
              <div className="flex justify-between font-medium text-sm">
                <div></div>
                <span
                  className={`${
                    coinInfo.market_data.price_change_percentage_24h < 0
                      ? "text-red-700"
                      : "text-green-700"
                  } text-[1rem] mt-1 xs:mt-2`}
                >
                  {coinInfo.market_data.price_change_percentage_24h > 0
                    ? "+" + coinInfo.market_data.price_change_percentage_24h
                    : coinInfo.market_data.price_change_percentage_24h}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full px-6 xs:px-0 h-[15rem] my-6 mt-10 xs:mt-10 xs:my-10 md:my-0">
            <Doughnut data={data} options={options} />
          </div>
          <p className={`font-bold text-sm ${styles.textCutoff}`}>
            {ReactHtmlParser(coinInfo.description.en)}
          </p>
        </main>
      )}
    </section>
  );
};

export default CoinInfo;
