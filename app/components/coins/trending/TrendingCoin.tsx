"use client";

interface ITrendingCoinProps {
  i: number;
  margin: number;
  name: string;
  image: string;
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
  // eslint-disable-next-line no-unused-vars
  handleCoinClick: (arg0: string, arg1: number) => void;
}

const TrendingCoin = ({
  i,
  id,
  margin,
  name,
  image,
  current_price,
  price_change_percentage_24h,
  handleCoinClick,
}: ITrendingCoinProps) => {
  return (
    <li
      style={{
        marginLeft: i === 0 ? margin : 0,
        marginRight: i === 9 ? margin : 12,
      }}
      className="bg-white flex flex-col justify-between w-[240px] rounded-lg shadow-md shrink-0 mt-[2px] mb-2 p-6
       outline-[#dedede] hover:outline hover:outline-[2px] hover:outline-[#dedede]
	  hover:bg-[#f9f9f9] transition-colors duration-150 ease-out cursor-pointer"
      onClick={() => handleCoinClick(id.toLowerCase(), current_price)}
    >
      <header>
        <div className="flex justify-between">
          <picture>
            <img src={image} alt="logo" className="h-10 w-10 rounded-full" />
          </picture>
          <picture>
            <img
              src={
                price_change_percentage_24h < 0
                  ? "/Untitledchart.svg"
                  : "/ChartAlt.svg"
              }
              alt="current chart"
            />
          </picture>
        </div>
        <h2 className="mt-2">
          {name}
          <span className="ml-1 text-gray-400">/ USD</span>
        </h2>
      </header>
      <section>
        <span
          className={
            price_change_percentage_24h < 0 ? "text-red-700" : "text-green-700"
          }
        >
          {price_change_percentage_24h < 0
            ? price_change_percentage_24h
            : "+" + price_change_percentage_24h}
          %
        </span>
        <h3 className="text-[1.3rem] font-medium">${current_price}</h3>
      </section>
    </li>
  );
};

export default TrendingCoin;
