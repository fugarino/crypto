"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import AuthProviderButton from "../AuthProviderButton";
import GoogleIcon from "../GoogleIcon";
import FormLayout from "./FormLayout";
import LightInputField from "./LightInputField";
import SubmitFormBtn from "./SubmitFormBtn";

const SignInForm = () => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    signin,
    loginWithGoogle,
    loginWithGoogleMobile,
    forgotPassword,
  }: any = useAuth();
  const router = useRouter?.();

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
    setSignInForm((prev) => ({
      ...prev,
      password: "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGoogleSignin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogleMobile();
      router.push("/");
    } catch (error) {
      setError("Unable to signin with google.");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setError("");
    setLoading(true);
    if (signInForm.email.length < 1 || !signInForm.email.includes("@")) {
      setLoading(false);
      return setError("Please enter the email used to sign in.");
    }
    try {
      await forgotPassword(signInForm.email);
      router.push(`/email/password?email=${signInForm.email}`);
    } catch {
      setError("Unable to send reset email.");
    }
    setLoading(false);
  };

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
        <div className="flex justify-end mb-4">
          <button
            className="font-medium"
            type="button"
            disabled={loading}
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>
        <SubmitFormBtn disabled={loading} text="Sign in" />
      </FormLayout>
      <AuthProviderButton
        providerName="Google"
        disabled={loading}
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
