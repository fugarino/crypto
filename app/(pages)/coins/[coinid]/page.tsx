import CoinsChart from "./CoinChart";
import CoinInfo from "./CoinInfo";
import Comments from "./Comments";

interface pageProps {
  params: { coinid: string };
}

const page = ({ params }: pageProps) => {
  const firstCharToUpper = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <section className="px-12 max-w-[1400px] mx-auto">
      <header className="mt-1 ml-6">
        <h1 className="font-bold text-[1.5rem]">
          {firstCharToUpper(params.coinid)}
        </h1>
        <h2 className="relative -top-2 text-[#67676d]">info</h2>
      </header>
      <div className="flex space-x-12 h-[35rem]">
        <div className="bg-white w-1/2 rounded-lg shadow-md">
          <CoinInfo id={params.coinid} />
        </div>
        <div className="w-1/2">
          <CoinsChart id={params.coinid} />
        </div>
      </div>
      <Comments coinid={params.coinid} />
    </section>
  );
};

export default page;
