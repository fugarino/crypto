import Image from "next/image";
import Link from "next/link";
import Menu from "./menu/Menu";

const Navbar = () => {
  return (
    <nav className="h-14 sm:w-14 sm:h-screen border-t border-r border-gray-200 bg-white">
      <div className="hidden sm:flex justify-center items-center w-full h-14 relative -top-[1.5px] -right-[0.5px]">
        <Link href="/" className="hidden sm:flex">
          <Image src="/L.svg" height={20} width={20} alt="logo" />
        </Link>
      </div>
      <Menu />
    </nav>
  );
};

export default Navbar;
