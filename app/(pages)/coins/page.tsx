import CoinSectionHeader from "./CoinSectionHeader";
import NewsLetter from "./NewsLetter";
import SectionCoins from "./SectionCoins";

const CoinsPage = () => {
  return (
    <div className="w-full h-full xs:pb-10">
      <header className="px-4 xs:px-8 sm:px-14 max-w-[1400px] mx-auto mt-1">
        <h1 className="font-bold text-[1.5rem] ml-4">Featured</h1>
        <h2 className="relative -top-2 text-[#67676d] ml-4">
          coins and discussions
        </h2>
      </header>
      <NewsLetter />
      <CoinSectionHeader className="mt-[39px]">
        top <span className="font-bold">ranked</span>
      </CoinSectionHeader>
      <SectionCoins sortMethod="market_cap" />
      <CoinSectionHeader className="flex items-center space-x-1">
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
      </CoinSectionHeader>
      <SectionCoins sortMethod="+" />
      <CoinSectionHeader className="flex items-center space-x-1">
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
      </CoinSectionHeader>
      <SectionCoins sortMethod="-" />
      <CoinSectionHeader>
        total <span className="font-bold">supply</span>
      </CoinSectionHeader>
      <SectionCoins sortMethod="circulating_supply" />
    </div>
  );
};
export default CoinsPage;
