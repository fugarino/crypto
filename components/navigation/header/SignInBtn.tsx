import Link from "next/link";

const SignInBtn = () => {
  return (
    <div className="w-[10rem] flex items-center justify-center">
      <Link
        href="/signin"
        className="border-2 border-slate-400 hover:border-slate-500
         px-8 py-2 rounded-md text-slate-500 font-semibold transition-all duration-200 ease-out"
      >
        Sign in
      </Link>
    </div>
  );
};

export default SignInBtn;
