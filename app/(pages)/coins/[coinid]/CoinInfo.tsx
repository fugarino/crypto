// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

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

  return (
    <div>
      {coin && (
        <div>
          <picture>
            <img src={coin.image.large} alt={coin.name} />
          </picture>
          <div className="font-bold">{coin.name}</div>
          <div>{ReactHtmlParser(coin.description.en)}</div>
          <div className="font-bold">Rank: {coin.market_cap_rank}</div>
          <div className="font-bold">
            Current Price: {coin.market_data.current_price["usd"]}
          </div>
          <div className="font-bold">
            Market Cap: {coin.market_data.market_cap["usd"]}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinInfo;
