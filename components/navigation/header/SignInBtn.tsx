"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SignInBtn = () => {
  const [isBtnStyled, setIsBtnStyled] = useState(false);
  const pathname = usePathname();

  return (
    <div className="w-[10rem] flex items-center justify-center">
      <Link
        href="/signin"
        className={`border-2 border-slate-400 px-8 py-2 rounded-md
        text-slate-500 font-semibold transition-all duration-200 ease-out
         ${
           isBtnStyled && pathname !== "/signin" ? "border-slate-500" : ""
         } transition-all duration-300 ease-out`}
        onMouseEnter={() => setIsBtnStyled(true)}
        onMouseLeave={() => setIsBtnStyled(false)}
        onClick={() => setIsBtnStyled(false)}
      >
        Sign in
      </Link>
    </div>
  );
};

export default SignInBtn;
