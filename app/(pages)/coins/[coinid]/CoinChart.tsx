"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ id }: any) => {
  const [days, setDays] = useState(1);

  const { data } = useQuery({
    queryKey: ["coinChart", id, days],
    queryFn: () =>
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      ).then((res) => res.json()),
    staleTime: 10 * (60 * 1000),
  });

  return (
    <section className="h-full">
      <div className="h-[93%]">
        {data && (
          <div className="h-full">
            <Line
              data={{
                labels: data.prices.map((coin: any) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    label: "",
                    data: data.prices.map((coin: any) => coin[1]),
                    borderColor: "#8e8a85",
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                interaction: { intersect: false },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                responsive: true,
                elements: {
                  point: {
                    radius: 1,
                    backgroundColor: "#00000013",
                  },
                },
                scales: {
                  y: {
                    display: false,
                  },
                  x: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="h-[10%] mt-2 md:mt-0 md:h-[7%] w-full">
        <div className="flex justify-between h-full">
          <button
            className={`px-0 w-[25%] lg:px-10 ${
              days === 1 && "bg-[#e0dddb]"
            } rounded-[4px]`}
            onClick={() => setDays(1)}
          >
            24h
          </button>
          <button
            className={`px-0 w-[25%] lg:px-10 ${
              days === 5 && "bg-[#e0dddb]"
            } rounded-[4px]`}
            onClick={() => setDays(5)}
          >
            5d
          </button>
          <button
            className={`px-0 w-[25%] lg:px-10 ${
              days === 30 && "bg-[#e0dddb]"
            } rounded-[4px]`}
            onClick={() => setDays(30)}
          >
            30d
          </button>
          <button
            className={`px-0 w-[25%] lg:px-10 ${
              days === 365 && "bg-[#e0dddb]"
            } rounded-[4px]`}
            onClick={() => setDays(365)}
          >
            1y
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoinChart;
