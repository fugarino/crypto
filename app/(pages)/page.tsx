import { Suspense } from "react";
import News from "../components/news/News";

const HomePage = () => {
  return (
    <main className="p-6 h-[calc(100vh-113px)] sm:h-[calc(100vh-56px)] overflow-y-scroll">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-[6rem] font-extrabold">Discover</h1>
        <h2 className="relative -top-4 text-[1.5rem] text-[#4A4A4A]">
          latest trends and developments
        </h2>
      </div>
      <Suspense fallback={<p>Loading news...</p>}>
        <News />
      </Suspense>
      <div className="flex flex-col items-center justify-center my-20">
        <h1 className="font-bold text-[2rem]">Stay Connected</h1>
        <h2 className="font-normal text-[1rem] text-[#4A4A4A]">
          share and discuss your thoughts & opinions
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row mt-6 space-x-6 h-[20rem] max-w-[1400px] mx-auto">
        <section className="bg-white w-1/2 p-6 rounded-lg shadow-md h-full">
          most volatile coins
        </section>
        <section className="bg-white w-1/2 p-6 rounded-lg shadow-md h-full">
          favorite coins
        </section>
      </div>
      <div className="bg-white h-[20rem] mt-6 p-6 rounded-lg shadow-md max-w-[1400px] mx-auto">
        top forum discussion
      </div>
    </main>
  );
};

export default HomePage;
