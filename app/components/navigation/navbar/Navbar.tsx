"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Profile from "../../auth/Profile";
import DropdownMenu from "./DropdownMenu";
import Menu from "./menu/Menu";
import ToggleMenu from "./menu/ToggleMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between px-8 sm:px-12 h-20">
        <div className="sm:hidden">
          <ToggleMenu
            isMenuOpen={isMenuOpen}
            handleMenuClick={handleMenuClick}
          />
        </div>
        <div className="hidden sm:flex">
          <Link href="/">
            <div className="flex items-center justify-center mr-[5rem]">
              <Image src="/L.svg" height={20} width={20} alt="logo" />
            </div>
          </Link>
          <Menu />
        </div>
        <div className="relative top-[1px] sm:top-[3px]">
          <Profile />
        </div>
      </div>
      <DropdownMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </nav>
  );
};

export default Navbar;
