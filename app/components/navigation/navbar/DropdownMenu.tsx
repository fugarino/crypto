"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/coins", label: "Coins" },
  { href: "/search", label: "Search" },
  { href: "/favorites", label: "Favorites" },
];

const DropdownMenu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const path = usePathname();

  return (
    <div
      className={`${
        isMenuOpen ? "h-16" : "h-0"
      } bg-[#dedbd9] flex justify-center items-center sm:hidden transition-all duration-150 ease-in overflow-hidden`}
    >
      <menu className="flex mx-10 xs:mx-16 items-center justify-between w-full">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={`relative sm:top-1 text-[0.9rem] ${
                link.href === path ? "text-black" : "text-[#696969]"
              } font-medium hover:text-black transition-all duration-300 ease-out`}
              onClick={() => setIsMenuOpen(false)}
              href={link.href}
            >
              {link.href === path && (
                <span className="absolute left-0 top-full block h-[2px] w-full bg-black" />
              )}
              {link.label}
            </Link>
          </li>
        ))}
      </menu>
    </div>
  );
};

export default DropdownMenu;
