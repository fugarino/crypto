// @ts-nocheck
"use client";

import Image from "next/image";
import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e, subscribe) => {
    e.preventDefault();
    setError("");

    console.log(email);
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    subscribe({ EMAIL: email });
  };

  return (
    <section className="px-4 xs:px-8 sm:px-10 max-w-[1400px] mx-auto">
      <div
        className="relative rounded-lg h-[14rem] xs:h-[16rem] shadow-md overflow-hidden object-cover
      flex items-center xs:items-end lg:items-center justify-center xs:justify-start"
      >
        <div className="relative z-10 top-6 xs:top-0 m-4 lg:w-[35%] lg:flex lg:flex-col lg:items-center">
          <h2 className="text-white font-semibold text-[1.75rem] leading-[1rem]">
            Subscribe to the <span className="gradientText">aiirlabs</span>
          </h2>
          <h2 className="text-white font-bold text-[3.85rem] leading-[4rem]">
            Newsletter
          </h2>
          <MailchimpSubscribe
            url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
            render={(props) => {
              const { subscribe, status, message } = props || {};
              return (
                <div>
                  <form onSubmit={(e) => handleFormSubmit(e, subscribe)}>
                    <div className="bg-white p-1 rounded-lg flex justify-between">
                      <input
                        type="email"
                        placeholder="add email..."
                        value={email}
                        className="px-2 h-[2rem] outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-black rounded-md text-white px-4 py-1"
                      >
                        subscribe
                      </button>
                    </div>
                  </form>
                  <span
                    style={{
                      color: status === "success" ? "#69c47d" : "#f01e2c",
                    }}
                    className="font-semibold -bottom-6"
                  >
                    {message}
                  </span>
                </div>
              );
            }}
          />
          {error && <div className="absolute text-red-400">{error}</div>}
        </div>
        <Image
          priority
          src="/Untitled design (8).png"
          width={1920}
          height={1334}
          alt="community"
          className="absolute top-0"
        />
      </div>
    </section>
  );
};

export default NewsLetter;
