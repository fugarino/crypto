import FeaturedComment from "../FeaturedComment";

const Featured = () => {
  return (
    <section className="px-4 xs:px-8 sm:px-10 max-w-[1400px] mx-auto mt-6 mb-6 xs:mb-10">
      <header className="flex justify-between items-center mx-4">
        <h2 className="font-bold text-[1.1rem] xs:text-[1.4rem] mb-1">
          <span className="text-[#67676d]">Stay</span>
          <span className="ml-[5px]">Connected</span>
        </h2>
        <aside className="text-[#67676d] text-[0.9rem]">
          Featured <span className="font-bold">24h</span>
        </aside>
      </header>
      <FeaturedComment />
    </section>
  );
};

export default Featured;
