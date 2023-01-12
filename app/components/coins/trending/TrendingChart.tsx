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

interface TrendingChartProps {
  id: string;
  price: number;
}

const TrendingChart = ({ id, price }: TrendingChartProps) => {
  const [historicData, setHistoricData] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
      );
      const data = await res.json();
      setHistoricData(data.prices);
    };
    fetchData();
  }, [id]);

  return (
    <section className="px-12 max-w-[1400px] mx-auto mb-14">
      <div className="flex justify-between items-center mx-4">
        <div>
          <h3 className="text-[#67676d]">
            {id[0].toUpperCase() + id.slice(1)}
          </h3>
          <h2 className="font-bold text-[1.4rem]">${price}</h2>
        </div>
        <aside className="text-[#67676d] text-[0.9rem]">
          Trending <span className="font-bold">24h</span>
        </aside>
      </div>
      <div className="flex justify-center">
        {historicData && (
          <div className="w-full h-[25rem]">
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return time;
                }),
                datasets: [
                  {
                    label: "",
                    data: historicData.map((coin) => coin[1]),
                    // borderColor: "#c8bcac",
                    // borderColor: "#ada293",
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
    </section>
  );
};

export default TrendingChart;
