"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router, currentUser]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[#f4f4f4]">
        <picture>
          <img src="/RocketLoader.svg" alt="loader" className="w-20 h-20" />
        </picture>
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
};

export default ProtectedRoute;
