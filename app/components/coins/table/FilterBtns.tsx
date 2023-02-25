const FilterBtns = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <ul className="absolute -bottom-11 md:bottom-auto md:-top-[3.5rem] md:right-4 flex w-full px-[20px] xs:w-auto justify-between xs:justify-center xs:space-x-16 text-[#67676d] text-[0.9rem] mt-4">
      <li
        className={`rounded-[4px] cursor-pointer px-4 py-1 text-[.9rem] xs:text-[1rem] ${
          filter === "market_cap" && "bg-[#e0dddb] text-black"
        }`}
        onClick={() => setFilter("market_cap")}
      >
        Market cap
      </li>
      <li
        className={`rounded-[4px] cursor-pointer px-4 py-1 text-[.9rem] xs:text-[1rem] ${
          filter === "current_price" && "bg-[#e0dddb] text-black"
        }`}
        onClick={() => setFilter("current_price")}
      >
        Price
      </li>
      <li
        className={`rounded-[4px] cursor-pointer px-4 py-1 text-[.9rem] xs:text-[1rem] ${
          filter === "circulating_supply" && "bg-[#e0dddb] text-black"
        }`}
        onClick={() => setFilter("circulating_supply")}
      >
        Supply
      </li>
    </ul>
  );
};

export default FilterBtns;
