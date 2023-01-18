import CoinsChart from "./CoinChart";
import CoinInfo from "./CoinInfo";

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
      <section className="my-10">
        <div className="flex items-center justify-between px-4">
          <h3 className="font-bold text-[1.4rem]">Comments</h3>
          <div className="flex relative top-[2px]">
            <span className="text-[#75757B]">
              How are you feeling about{" "}
              <span className="font-bold">{params.coinid}</span> today?
            </span>
            <span className="flex items-center ml-10 font-bold">
              <span className="mr-1">latest</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="bg-white h-[30rem] mt-1 rounded-lg shadow-md"></div>
      </section>
    </section>
  );
};

export default page;
