"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import AuthProviderButton from "../AuthProviderButton";
import GoogleIcon from "../GoogleIcon";
import FormLayout from "./FormLayout";
import LightInputField from "./LightInputField";
import SubmitFormBtn from "./SubmitFormBtn";

const SignUpForm = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup }: any = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleGoogleSignup = async () => {};

  return (
    <>
      <FormLayout
        handleSubmit={handleSubmit}
        error={error}
        h1="Create an account"
        p="Create an account, to access all features."
      >
        <LightInputField
          labelText="Email"
          type="email"
          name="email"
          placeholder="name@mail.com"
          value={signUpForm.email}
          onChange={handleCredentialChange}
        />
        <LightInputField
          labelText="Password"
          type="password"
          name="password"
          placeholder="6+ Characters, 1 Capital letter"
          value={signUpForm.password}
          onChange={handleCredentialChange}
        />
        <LightInputField
          labelText="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="6+ Characters, 1 Capital letter"
          value={signUpForm.confirmPassword}
          onChange={handleCredentialChange}
        />
        <SubmitFormBtn disabled={loading} text="Create account" />
      </FormLayout>
      <AuthProviderButton
        providerName="Google"
        handleSignIn={handleGoogleSignup}
      >
        <GoogleIcon />
      </AuthProviderButton>
      <div className="flex justify-center mt-5">
        <p className="mr-2">Already have an account?</p>
        <Link href="/signin" className="font-bold text-[#eb6262]">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default SignUpForm;
