"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import AuthProviderButton from "../AuthProviderButton";
import GoogleIcon from "../GoogleIcon";
import FormLayout from "./FormLayout";
import LightInputField from "./LightInputField";
import SubmitFormBtn from "./SubmitFormBtn";

const SignInForm = () => {
  const [signInForm, setVal] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin }: any = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signin(signInForm.email, signInForm.password);
    } catch {
      setError("Username or password is incorrect.");
    } finally {
      setLoading(false);
    }
    setVal((prev) => ({
      ...prev,
      password: "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGoogleSignin = async () => {};

  return (
    <>
      <FormLayout
        handleSubmit={handleSubmit}
        error={error}
        h1="Welcome back"
        p="Please enter your credentials."
      >
        <LightInputField
          labelText="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={signInForm.email}
          onChange={handleChange}
        />
        <LightInputField
          labelText="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={signInForm.password}
          onChange={handleChange}
        />
        <SubmitFormBtn disabled={loading} text="Sign in" />
      </FormLayout>
      <AuthProviderButton
        providerName="Google"
        handleSignIn={handleGoogleSignin}
      >
        <GoogleIcon />
      </AuthProviderButton>
      <div className="flex justify-center mt-5">
        <p className="mr-2">{`Don't have an account?`}</p>
        <Link href="/signup" className="font-bold text-[#eb6262]">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default SignInForm;
