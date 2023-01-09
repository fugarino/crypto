import { Suspense } from "react";
import TrendingCoins from "../components/coins/trending/TrendingCoins";
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
      {/* @ts-ignore */}
      <TrendingCoins />
    </div>
  );
};

export default HomePage;
