"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Profile from "../../auth/Profile";
import Menu from "./menu/Menu";
import ToggleMenu from "./menu/ToggleMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <div className="flex items-center justify-center">
              <Image src="/L.svg" height={20} width={20} alt="logo" />
            </div>
          </Link>
          <Menu />
        </div>
        <div className="relative top-[1px] sm:top-[3px]">
          <Profile />
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "h-16" : "h-0"
        } bg-[#dedbd9] flex justify-center items-center sm:hidden transition-all duration-150 ease-in overflow-hidden`}
      >
        <div className="flex items-center space-x-14">
          <Link
            href="/"
            className={`relative ${
              path === "/" ? "text-black" : "text-[#696969]"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            {path === "/" && (
              <span className="absolute left-0 top-full block h-[2px] w-full bg-black" />
            )}
          </Link>
          <Link
            href="/coins"
            className={`relative ${
              path === "/coins" ? "text-black" : "text-[#696969]"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
            {path === "/coins" && (
              <span className="absolute top-full block h-[2px] w-full bg-black" />
            )}
          </Link>
          <Link
            href="/search"
            className={`relative ${
              path === "/search" ? "text-black" : "text-[#696969]"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            {path === "/search" && (
              <span className="absolute top-full block h-[2px] w-full bg-black" />
            )}
          </Link>
          <Link
            href="/favorites"
            className={`relative ${
              path === "/favorites" ? "text-black" : "text-[#696969]"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            {path === "/favorites" && (
              <span className="absolute top-full block h-[2px] w-full bg-black" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
