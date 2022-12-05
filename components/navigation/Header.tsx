import { BellIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between h-14 sm:w-[calc(100vw-56px)] border-b border-gray-200 bg-white">
      <div className="w-14 h-full flex justify-center items-center">
        <Link href="/" className="sm:hidden">
          <Image src="/L.svg" height={20} width={20} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-between h-full w-28 px-5">
        <button>
          <BellIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="rounded-full w-8 h-8 bg-red-400"></div>
      </div>
    </header>
  );
};

export default Header;
