interface ITrendingCoinProps {
  i: number;
  margin: number;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const TrendingCoin = ({
  i,
  margin,
  name,
  image,
  current_price,
  price_change_percentage_24h,
}: ITrendingCoinProps) => {
  return (
    <li
      style={{
        marginLeft: i === 0 ? margin : 0,
        marginRight: i === 9 ? margin : 12,
      }}
      className="bg-white flex flex-col justify-between w-[240px] rounded-lg shadow-md shrink-0 mb-2 p-6"
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
