import CoinsChart from "./CoinChart";
import CoinInfo from "./CoinInfo";

interface pageProps {
  params: { coinid: string };
}

const page = async ({ params }: pageProps) => {
  return (
    <div>
      <CoinInfo id={params.coinid} />
      <CoinsChart id={params.coinid} />
    </div>
  );
};

export default page;
