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

  const toMillions = (num) => {
    return num.toString().slice(0, -6) + "M";
  };

  return (
    <div className="relative p-10 h-full">
      <FavoritesBtn coin={coinInfo} />
      {coinInfo && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between">
            <div className="font-bold text-[3rem] text-[#989898] leading-[2.5rem]">
              Rank: {coinInfo.market_cap_rank}
            </div>
            <div>
              <div className="flex justify-between">
                <div></div>
                <div className="font-bold text-[2rem] leading-[1.7rem]">
                  ${coinInfo.market_data.current_price["usd"]}
                </div>
              </div>
              <div className="flex justify-between font-medium text-sm">
                <div></div>
                <div>
                  <span className="text-[#989898]">Market Cap: </span>
                  {toMillions(coinInfo.market_data.market_cap["usd"])}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full h-[15rem]">
            <Doughnut data={data} options={options} />
          </div>
          <div className={`font-bold text-sm ${styles.textCutoff}`}>
            {ReactHtmlParser(coinInfo.description.en)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinInfo;
