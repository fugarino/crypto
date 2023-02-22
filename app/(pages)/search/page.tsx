import CoinsTableList from "../../components/coins/table/CoinsTableList";

const CoinsPage = () => {
  return (
    <section className="px-6 sm:px-12 max-w-[1400px] mx-auto">
      <header className="mt-1 ml-6">
        <h1 className="font-bold text-[1.5rem]">Search</h1>
        <h2 className="relative -top-2 text-[#67676d]">top cryptocurrencies</h2>
      </header>
      <CoinsTableList />
    </section>
  );
};

export default CoinsPage;
