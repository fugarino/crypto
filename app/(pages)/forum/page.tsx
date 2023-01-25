import Image from "next/image";
import Test from "./Test";

const ForumPage = () => {
  return (
    <div className="w-full h-full">
      <header className="px-14 max-w-[1400px] mx-auto mt-1">
        <h1 className="font-bold text-[1.5rem] ml-4">Discover</h1>
        <h2 className="relative -top-2 text-[#67676d] ml-4">
          latest trends and developments
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
            src="/Untitled design (8).png"
            width={1920}
            height={1334}
            alt="community"
            className="absolute top-0"
          />
        </div>
      </div>
      <h1 className="pl-14 mt-8">Favorites</h1>
      <Test />
      <h1 className="pr-14 mt-1 text-right font-bold text-[5rem] text-[#dad4ce] leading-[2rem]">
        Market cap
      </h1>
      <Test />
      <h1 className="pl-14 mt-1 font-bold text-[5rem] text-[#dad4ce] leading-[2rem]">
        + 24h
      </h1>
      <Test />
      <h1 className="pr-14 mt-1 text-right font-bold text-[5rem] text-[#dad4ce] leading-[2rem]">
        - 24h
      </h1>
      <Test />
      <div className="mb-10"></div>
    </div>
  );
};
export default ForumPage;
