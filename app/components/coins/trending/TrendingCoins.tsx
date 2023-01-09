import TrendingCoinsList from "./TrendingCoinsList";

const fetchData = async (currency: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
    { next: { revalidate: 60 } }
  );
  return res.json();
};

const TrendingCoins = async () => {
  const data: any[] = await fetchData("USD");
  return <TrendingCoinsList data={data} />;
};

export default TrendingCoins;
