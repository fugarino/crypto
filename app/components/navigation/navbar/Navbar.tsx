import { LogoutIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu/Menu";

const Navbar = () => {
  return (
    <nav className="sticky left-0 top-0 h-screen w-14 bg-[#e0d6cc]">
      <Link href="/">
        <div className="flex items-center justify-center w-14 h-14">
          <Image src="/L.svg" height={20} width={20} alt="logo" />
        </div>
      </Link>
      <div className="flex flex-col items-center h-[calc(100%-4rem)]">
        <Menu />
        <aside className="h-1/2 flex flex-col items-center justify-between">
          <div></div>
          <button className="flex items-center justify-center w-10 h-10 rounded-[5px] hover:bg-gray-200 mb-4">
            <LogoutIcon className="menuIcon" />
          </button>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
