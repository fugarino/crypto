"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import SignInBtn from "./SignInBtn";
import UserBtns from "./UserBtns";

const Header = () => {
  const { currentUser }: any = useAuth();
  return (
    <header className="flex justify-between h-14 sm:w-[calc(100vw-56px)] border-b border-gray-200 bg-white">
      <div className="w-14 h-full flex justify-center items-center">
        <Link href="/" className="sm:hidden">
          <Image src="/L.svg" height={20} width={20} alt="logo" />
        </Link>
      </div>
      {currentUser && currentUser.emailVerified ? <UserBtns /> : <SignInBtn />}
    </header>
  );
};

export default Header;
