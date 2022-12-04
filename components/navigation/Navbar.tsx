import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <nav className="w-16 bg-white border-r-[1px] border-[#E0E0E0]">
      <div className="flex items-center justify-center h-16">
        <Link href="/">
          <Image src="/L.svg" height={25} width={25} alt="logo" />
        </Link>
      </div>
      <Menu />
    </nav>
  );
};

export default Navbar;
