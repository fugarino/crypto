const SearchCoins = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex items-center w-full h-[3.5rem] sm:h-[4rem] px-[1rem] md:px-[2rem] bg-white rounded-lg shadow-md">
      <div className="flex justify-center w-[10%] md:w-[5%] text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Search coins..."
        className="h-full w-[90%] outline-none text-[1rem]"
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className="text-gray-400 w-[10%] md:w-[5%] flex justify-center text-sm min-w-fit">
        / USD
      </span>
    </div>
  );
};

export default SearchCoins;
