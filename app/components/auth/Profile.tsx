"use client";

import { useAuth } from "../../../contexts/AuthContext";
import SignInBtn from "../navigation/header/SignInBtn";
import UserBtns from "../navigation/header/UserBtns";

const Profile = () => {
  const { currentUser }: any = useAuth();
  return (
    <div className="flex items-center justify-between">
      <div></div>
      {currentUser && currentUser.emailVerified ? <UserBtns /> : <SignInBtn />}
    </div>
  );
};

export default Profile;
