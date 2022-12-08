"use client";

import Link from "next/link";
import React, { useState } from "react";

const SignInPage = () => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signInForm.email);
    console.log(signInForm.password);
    setSignInForm({
      email: "",
      password: "",
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          required
          type="email"
          name="email"
          value={signInForm.email}
          placeholder="email..."
          onChange={handleFormChange}
        />
        <input
          required
          type="password"
          name="password"
          value={signInForm.password}
          placeholder="password..."
          onChange={handleFormChange}
        />
        <button type="submit">sign in</button>
      </form>
      <Link href="/signup">signup</Link>
    </>
  );
};

export default SignInPage;
