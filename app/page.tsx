"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import "../styles/globals.css";

const HomePage = () => {
  const { currentUser, logout }: any = useAuth();
  return (
    <main className="px-6 py-4 h-[calc(100vh-113px)] sm:h-[calc(100vh-56px)] overflow-y-scroll">
      <Link href="/signin">signin</Link>
      <div>{currentUser?.email}</div>
      <div onClick={logout} className="cursor-pointer">
        sign out
      </div>
    </main>
  );
};

export default HomePage;
