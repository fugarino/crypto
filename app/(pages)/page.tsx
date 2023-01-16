import { Suspense } from "react";
import TrendingCoinsList from "../components/coins/trending/TrendingCoinsList";
import News from "../components/news/News";
import "./globals.css";

const HomePage = () => {
  return (
    <div className="w-full h-full">
      <header className="px-14 max-w-[1400px] mx-auto mt-1">
        <h1 className="font-bold text-[1.5rem] ml-4">Discover</h1>
        <h2 className="relative -top-2 text-[#67676d] ml-4">
          latest trends and developments
        </h2>
      </header>
      <Suspense fallback={<p>Loading news...</p>}>
        <News />
      </Suspense>
      <TrendingCoinsList />
      <div className="px-12 max-w-[1400px] mx-auto mt-6 mb-12">
        <h2 className="font-bold text-[1.4rem] ml-4 mb-1">
          <span className="text-[#67676d]">Stay</span>
          <span className="ml-[5px]">Connected</span>
        </h2>
        <div className="bg-white h-[25rem] shadow-md rounded-lg"></div>
      </div>
    </div>
  );
};

export default HomePage;
