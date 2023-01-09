"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/coins", label: "Coins" },
  { href: "/forum", label: "Forum" },
  { href: "/favorites", label: "Favorites" },
];

const Menu = () => {
  const path = usePathname();

  return (
    <menu className="flex ml-[5rem] space-x-10">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={`relative top-1 ${
              link.href === path ? "text-black" : "text-[#696969]"
            } font-medium hover:text-black transition-all duration-300 ease-out`}
            href={link.href}
          >
            {link.href === path && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 top-full block h-[2px] w-full bg-black"
              />
            )}
            {link.label}
          </Link>
        </li>
      ))}
    </menu>
  );
};

export default Menu;
