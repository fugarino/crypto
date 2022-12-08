import { ReactNode } from "react";

interface IAuthProviderButtonProps {
  children: ReactNode;
  providerName: string;
  handleSignIn: () => Promise<void>;
}

const AuthProviderButton = ({
  children,
  providerName,
  handleSignIn,
}: IAuthProviderButtonProps) => {
  return (
    <button
      onClick={handleSignIn}
      className="w-full border-2 rounded-[7px] p-2 font-medium flex items-center justify-center hover:border-[#9497b4] transition-all duration-150 ease-out"
    >
      {children}
      <p className="ml-4">Sign in with {providerName}</p>
    </button>
  );
};

export default AuthProviderButton;
