"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SignInBtn = () => {
  const [isBtnStyled, setIsBtnStyled] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex">
      <Link
        href="/signin"
        className={`border-2 border-slate-500 px-8 py-2 rounded-md
        text-slate-600 font-semibold transition-all duration-200 ease-out
         ${
           isBtnStyled && pathname !== "/signin" ? "border-slate-600" : ""
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
