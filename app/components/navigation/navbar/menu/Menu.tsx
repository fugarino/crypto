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
    <menu className="flex relative top-[8px] ml-[10rem] space-x-16 text-black text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <Link className="relative" href={link.href}>
            {link.href === path && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 top-full block h-[1.5px] w-full bg-black"
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
