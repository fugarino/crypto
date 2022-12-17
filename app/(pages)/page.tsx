import { Suspense } from "react";
import News from "../components/news/News";

const HomePage = () => {
  return (
    <main className="p-6 h-[calc(100vh-113px)] sm:h-[calc(100vh-56px)] overflow-y-scroll">
      <Suspense fallback={<p>Loading news...</p>}>
        {/* @ts-expect-error Server Component */}
        <News />
      </Suspense>
      <div className="flex flex-col lg:flex-row mt-6 space-x-6 h-[30%] max-w-[1400px] mx-auto">
        <section className="bg-white w-1/2 p-6 rounded-lg shadow-md h-full">
          hi
        </section>
        <section className="bg-white w-1/2 p-6 rounded-lg shadow-md h-full">
          bye
        </section>
      </div>
    </main>
  );
};

export default HomePage;
