import Image from "next/image";
import Link from "next/link";
import Menu from "./menu/Menu";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-14 sm:relative sm:w-14 sm:min-w-14 sm:h-screen border-t sm:border-t-0 sm:border-r border-gray-200 bg-white">
      <div className="hidden sm:flex justify-center items-center w-full h-14 relative -top-[.5px] -right-[.5px]">
        <Link href="/" className="hidden sm:flex">
          <Image src="/L.svg" height={20} width={20} alt="logo" />
        </Link>
      </div>
      <Menu />
    </nav>
  );
};

export default Navbar;
