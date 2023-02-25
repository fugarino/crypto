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
    <section className="px-4 xs:px-8 sm:px-10 max-w-[1400px] mx-auto">
      <header className="mt-1 ml-4 xs:ml-6">
        <h1 className="font-bold text-[1.5rem]">
          {firstCharToUpper(params.coinid)}
        </h1>
        <h2 className="relative -top-2 text-[#67676d]">info</h2>
      </header>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-12 md:h-[35rem]">
        <div className="bg-white w-full md:w-1/2 rounded-lg shadow-md">
          <CoinInfo id={params.coinid} />
        </div>
        <div className="w-full md:w-1/2 h-[25rem] md:h-auto">
          <CoinsChart id={params.coinid} />
        </div>
      </div>
      <Comments coinid={params.coinid} />
    </section>
  );
};

export default page;
