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
      <h1 className="pl-14 mt-12 font-bold text-[3rem] ml-4 text-[#cccccc] leading-[26px]">
        Top ranked
      </h1>
      <Test sortMethod="market_cap" />
      <h1 className="pl-14 mt-3 font-bold text-[3rem] ml-4 text-[#cccccc] leading-[26px]">
        +24h
      </h1>
      <Test sortMethod="+" />
      <h1 className="pl-14 mt-3 font-bold text-[3rem] ml-4 text-[#cccccc] leading-[26px]">
        -24h
      </h1>
      <Test sortMethod="-" />
      <h1 className="pl-14 mt-3 font-bold text-[3rem] ml-4 text-[#cccccc] leading-[26px]">
        Supply
      </h1>
      <Test sortMethod="circulating_supply" />
      <div className="mb-10"></div>
    </div>
  );
};
export default CoinsPage;
