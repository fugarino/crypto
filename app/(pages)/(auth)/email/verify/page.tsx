"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

const VerifyEmailPage = () => {
  const searchParam = useSearchParams();
  const email = searchParam.get("email");
  return (
    <section className="flex flex-col items-center justify-center h-[50vh] p-10">
      <Image
        src="/notification_illustration_3.svg"
        height={125}
        width={125}
        alt="logo"
      />
      <h1 className="font-bold text-2xl mt-4">Verify Email</h1>
      <p className="mt-2">{`You're almost there! We sent an email to`}</p>
      {email && <p className="font-semibold">{email}</p>}
      <p className="mt-3 text-center">
        Just click the link in that email to complete your signup.
      </p>
      <p className="text-center">{`If you don't see it, you may need to check your spam folder.`}</p>
    </section>
  );
};

export default VerifyEmailPage;
