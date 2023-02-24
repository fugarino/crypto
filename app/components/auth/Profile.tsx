"use client";

import { useAuth } from "../../../contexts/AuthContext";
import SignInBtn from "../navigation/header/SignInBtn";
import UserBtns from "../navigation/header/UserBtns";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <div></div>
      {currentUser ? <UserBtns /> : <SignInBtn />}
    </div>
  );
};

export default Profile;
