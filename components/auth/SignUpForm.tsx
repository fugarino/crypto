"use client";

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const SignUpForm = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup, currentUser }: any = useAuth();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpForm.password.length < 6) {
      return setError("Password is needs to be 6+ Characters");
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      return setError("Password and Confirm Password do not match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(signUpForm.email, signUpForm.password);
      console.log(currentUser);
      setLoading(false);
    } catch {
      setError("Unable to signup");
    }
    setSignUpForm({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSignup}>
      {error && <div className="text-red-400">{error}</div>}
      <input
        type="email"
        name="email"
        value={signUpForm.email}
        placeholder="example@mail.com"
        onChange={handleCredentialChange}
      />
      <input
        type="password"
        name="password"
        value={signUpForm.password}
        placeholder="6+ Characters, 1 Capital letter"
        onChange={handleCredentialChange}
      />
      <input
        type="password"
        name="confirmPassword"
        value={signUpForm.confirmPassword}
        placeholder="6+ Characters, 1 Capital letter"
        onChange={handleCredentialChange}
      />
      <button type="submit" disabled={loading}>
        sign up
      </button>
    </form>
  );
};

export default SignUpForm;
