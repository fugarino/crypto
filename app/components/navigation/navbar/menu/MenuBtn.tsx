"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Label from "./Label";

interface IProps {
  url: string;
  text: string;
  children: React.ReactNode;
}

const MenuBtn = ({ url, text, children }: IProps) => {
  const [showLabel, setShowLabel] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.innerWidth > 640 ? setIsDesktop(true) : setIsDesktop(false);
    const updateMedia = () => {
      window.innerWidth > 640 ? setIsDesktop(true) : setIsDesktop(false);
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <li>
      <Link href={url}>
        <button
          onMouseEnter={() => setShowLabel(true)}
          onMouseLeave={() => setShowLabel(false)}
          onClick={() => setShowLabel(false)}
          className={`
            relative z-10 flex items-center justify-center w-10 h-10 rounded-[5px]
            hover:bg-[#cbc1b1] transition-all ease-out active:translate-y-1
            ${pathname == url && "active bg-[#cbc1b1]"}
          `}
        >
          {children}
          {showLabel && isDesktop && <Label text={text} />}
        </button>
      </Link>
    </li>
  );
};

export default MenuBtn;
