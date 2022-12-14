"use client";

import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const ProfileButton = () => {
  const [darkProfileBorder, setDarkProfileBorder] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser }: any = useAuth();

  const onProfileMouseEnter = () => {
    setDarkProfileBorder(true);
  };

  const onProfileMouseLeave = () => {
    if (!showProfile) {
      setDarkProfileBorder(false);
    }
  };

  const onProfileClick = () => {
    setShowProfile(!showProfile);
    !showProfile ? setDarkProfileBorder(true) : setDarkProfileBorder(false);
  };

  return (
    <div className="w-9 h-9 flex items-center justify-center">
      <button
        className={`w-full h-full rounded-full border-[1px] flex items-center justify-center active:w-[32px] active:h-[32px] transition-all duration-200 ease-out ${
          darkProfileBorder ? "border-gray-400" : "border-gray-300"
        }`}
        onMouseEnter={onProfileMouseEnter}
        onMouseLeave={onProfileMouseLeave}
        onClick={onProfileClick}
      >
        <picture className="flex items-center justify-center">
          <img
            src={
              currentUser.photoURL ? currentUser.photoURL : "/Untitled (5).svg"
            }
            alt="profile"
            referrerPolicy="no-referrer"
            id="profile"
            className="w-[32px] h-[32px] rounded-full object-cover"
          />
        </picture>
      </button>
      {showProfile && (
        <ProfileDropdown
          setShowProfile={setShowProfile}
          setDarkProfileBorder={setDarkProfileBorder}
        />
      )}
    </div>
  );
};

export default ProfileButton;
