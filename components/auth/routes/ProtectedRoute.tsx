"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { currentUser }: any = useAuth();
  const router = useRouter();

  if (currentUser && currentUser.emailVerified) {
    router.push("/");
  }

  if (currentUser && currentUser.emailVerified) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[#f4f4f4]">
        <picture>
          <img src="/RocketLoader.svg" alt="loader" className="w-20 h-20" />
        </picture>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
