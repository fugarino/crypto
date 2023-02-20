import Image from "next/image";
import Link from "next/link";
import Profile from "../../auth/Profile";
import Menu from "./menu/Menu";

const Navbar = () => {
  return (
    <nav className="flex items-center max-w-[1400px] mx-auto justify-between px-8 sm:px-12 h-20">
      <div className="sm:hidden">hi</div>
      <div className="hidden sm:flex">
        <Link href="/">
          <div className="flex items-center justify-center">
            <Image src="/L.svg" height={20} width={20} alt="logo" />
          </div>
        </Link>
        <Menu />
      </div>
      <div className="relative top-[5px]">
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
