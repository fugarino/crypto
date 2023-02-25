import { Suspense } from "react";
import TrendingCoinsList from "../components/coins/trending/TrendingCoinsList";
import Featured from "../components/featured/Featured";
import News from "../components/news/News";
import "./globals.css";

const HomePage = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <header className="px-4 xs:px-8 sm:px-14 max-w-[1400px] mx-auto mt-1">
        <h1 className="font-bold text-[1.5rem] ml-4">Discover</h1>
        <h2 className="relative -top-2 text-[#67676d] ml-4">
          latest trends and developments
        </h2>
      </header>
      <Suspense fallback={<p>Loading news...</p>}>
        {/* @ts-ignore */}
        <News />
      </Suspense>
      <TrendingCoinsList />
      <Featured />
    </div>
  );
};

export default HomePage;
