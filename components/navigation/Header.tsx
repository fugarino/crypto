import { BellIcon } from "@heroicons/react/outline";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 bg-white border-b-[1px] border-[#E0E0E0]">
      <div></div>
      <div className="flex items-center justify-between h-full w-[6.5rem] px-4">
        <button>
          <BellIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="rounded-full w-8 h-8 bg-red-400"></div>
      </div>
    </header>
  );
};

export default Header;
