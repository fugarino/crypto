"use client";

import Image from "next/image";
import SignUpForm from "../../components/auth/SignUpForm";
import LargeCard from "../../components/layouts/LargeCard";
import { useAuth } from "../../contexts/AuthContext";

const SignUpPage = () => {
  const { currentUser }: any = useAuth();
  return (
    <main className="h-[calc(100vh-113px)] sm:h-[calc(100vh-56px)] py-4 px-6 overflow-y-scroll">
      <LargeCard>
        <div className="flex h-full max-h-[1000px] overflow-hidden">
          <aside className="relative lg:w-1/2 p-2 hidden lg:flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="absolute">
              <Image
                src="/rocketB.svg"
                width={500}
                height={500}
                alt="rocket illustration"
              />
            </div>
          </aside>
          <article className="w-full lg:w-1/2 flex flex-col justify-center items-center">
            <div className="w-5/6 max-w-[26rem]">
              <SignUpForm />
            </div>
          </article>
        </div>
        <h1>{currentUser?.email}</h1>
      </LargeCard>
    </main>
  );
};

export default SignUpPage;
