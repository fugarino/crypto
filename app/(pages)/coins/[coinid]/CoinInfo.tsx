// @ts-nocheck

"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ReactHtmlParser from "react-html-parser";
import styles from "./CoinInfo.module.css";
import FavoritesBtn from "./FavoritesBtn";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CoinInfoProps {
  id: string;
}

const CoinInfo = ({ id }: CoinInfoProps) => {
  const [coin, setCoin] = useState<any>();

  useEffect(() => {
    const fetchCoinData = async () => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await res.json();
      setCoin(data);
    };
    fetchCoinData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = {
    labels: [
      coin?.market_data.max_supply === null
        ? "unlimited supply"
        : "circulating supply",
      "supply left",
    ],
    datasets: [
      {
        label:
          coin?.market_data.max_supply === null ? "circulating supply" : "",
        data: [
          coin?.market_data.circulating_supply,
          coin?.market_data.max_supply === null ||
          coin?.market_data.max_supply === undefined
            ? 0
            : coin?.market_data.max_supply -
              coin?.market_data.circulating_supply,
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

  const toMillions = (num) => {
    return num.toString().slice(0, -6) + "M";
  };

  return (
    <div className="relative p-10 h-full">
      <FavoritesBtn coin={coin} />
      {coin && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between">
            <div className="font-bold text-[3rem] text-[#989898] leading-[2.5rem]">
              Rank: {coin.market_cap_rank}
            </div>
            <div>
              <div className="flex justify-between">
                <div></div>
                <div className="font-bold text-[2rem] leading-[1.7rem]">
                  ${coin.market_data.current_price["usd"]}
                </div>
              </div>
              <div className="flex justify-between font-medium text-sm">
                <div></div>
                <div>
                  <span className="text-[#989898]">Market Cap: </span>
                  {toMillions(coin.market_data.market_cap["usd"])}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full h-[15rem]">
            <Doughnut data={data} options={options} />
          </div>
          <div className={`font-bold text-sm ${styles.textCutoff}`}>
            {ReactHtmlParser(coin.description.en)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinInfo;
