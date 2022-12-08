import Link from "next/link";

const SignInBtn = () => {
  return (
    <div className="w-[10rem] flex items-center justify-center">
      <Link
        href="/signin"
        className="bg-red-300 hover:bg-red-400 px-8 py-2 rounded-md text-white"
      >
        Sign in
      </Link>
    </div>
  );
};

export default SignInBtn;
