"use client";

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
import { useEffect, useState } from "react";
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
  const [historicData, setHistoricData] = useState<any[]>();
  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      );
      const data = await res.json();
      setHistoricData(data.prices);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className="h-full">
      <div className="h-[93%]">
        {historicData && (
          <div className="h-full">
            <Line
              data={{
                labels: historicData.map((coin) => {
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
                    data: historicData.map((coin) => coin[1]),
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
                    //   ticks: {
                    //     color: "#6e97a1",
                    //   },
                    //   grid: {
                    //     color: "white",
                    //     display: false,
                    //   },
                  },
                  x: {
                    display: false,
                    //   ticks: {
                    //     color: "#742f2f",
                    //   },
                    //   grid: {
                    //     // color: "red",
                    //     display: false,
                    //   },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="h-[7%] w-full">
        <div className="flex justify-between h-full">
          <button
            className={`px-10 ${days === 1 && "bg-[#e0dddb]"} rounded-[4px]`}
            onClick={() => setDays(1)}
          >
            24h
          </button>
          <button
            className={`px-10 ${days === 5 && "bg-[#e0dddb]"} rounded-[4px]`}
            onClick={() => setDays(5)}
          >
            5d
          </button>
          <button
            className={`px-10 ${days === 30 && "bg-[#e0dddb]"} rounded-[4px]`}
            onClick={() => setDays(30)}
          >
            30d
          </button>
          <button
            className={`px-10 ${days === 365 && "bg-[#e0dddb]"} rounded-[4px]`}
            onClick={() => setDays(365)}
          >
            1y
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinChart;
