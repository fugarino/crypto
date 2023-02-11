import Image from "next/image";
import Test from "./Test";

const CoinsPage = () => {
  return (
    <div className="w-full h-full">
      <header className="px-14 max-w-[1400px] mx-auto mt-1">
        <h1 className="font-bold text-[1.5rem] ml-4">Featured</h1>
        <h2 className="relative -top-2 text-[#67676d] ml-4">
          coins and discussions
        </h2>
      </header>
      <div className="px-12 max-w-[1400px] mx-auto">
        <div className="relative rounded-lg h-[16rem] shadow-md overflow-hidden object-cover">
          <div className="relative z-10 flex items-center justify-center h-full w-[45%]">
            <div>
              <div className="h-4"></div>
              <h2 className="text-white font-semibold text-[2rem] leading-3">
                Subscribe to the <span className="gradientText">aiirlabs</span>
              </h2>
              <h2 className="text-white font-bold text-[4.75rem] leading-[5rem] mt-1">
                Newsletter
              </h2>
              <form className="bg-white p-1 pl-4 w-full mt-2 flex justify-between rounded-lg">
                <input type="text" placeholder="add email..." />
                <button
                  type="submit"
                  className="bg-black text-white rounded-md py-1 px-4"
                >
                  subscribe
                </button>
              </form>
            </div>
          </div>
          <Image
            priority
            src="/Untitled design (8).png"
            width={1920}
            height={1334}
            alt="community"
            className="absolute top-0"
          />
        </div>
      </div>
      <h3 className="text-[#67676d] mt-8 pl-14 ml-4">
        top <span className="font-bold">ranked</span>
      </h3>
      <Test sortMethod="market_cap" />
      <h3 className="text-[#67676d] mt-4 pl-14 ml-4 flex items-center space-x-2">
        <span>trending</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </span>
        <span className="font-bold">24h</span>
      </h3>
      <Test sortMethod="+" />
      <h3 className="text-[#67676d] mt-4 pl-14 ml-4 flex items-center space-x-2">
        <span>trending</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
          />
        </svg>
        <span className="font-bold">24h</span>
      </h3>
      <Test sortMethod="-" />
      <h3 className="text-[#67676d] mt-4 pl-14 ml-4">
        total <span className="font-bold">supply</span>
      </h3>
      <Test sortMethod="circulating_supply" />
      <div className="mb-10"></div>
    </div>
  );
};
export default CoinsPage;
