// import CoinsTableList from "./CoinsTableList";

// const fetchData = async (currency: string) => {
//   const res = await fetch(
//     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
//     { next: { revalidate: 120 } }
//   );
//   return res.json();
// };

const CoinsTable = async () => {
  // const data: any[] = await fetchData("USD");
  return <section>{/* <CoinsTableList data={data} /> */}</section>;
};

export default CoinsTable;
