"use client";

import { useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";

interface IProfileDropDown {
  // eslint-disable-next-line
  setShowProfile: (arg0: boolean) => void;
  // eslint-disable-next-line
  setDarkProfileBorder: (arg0: boolean) => void;
}

const ProfileDropDown = ({
  setShowProfile,
  setDarkProfileBorder,
}: IProfileDropDown) => {
  const ref = useRef<any>(null);

  const handleClickOutside = (e: any) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      e.target.id !== "profile"
    ) {
      setShowProfile(false);
      setDarkProfileBorder(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <div
      ref={ref}
      className={`absolute z-10 top-[55px] right-0 sm:-right-2 w-[calc(100vw-4rem)] xs:w-80 bg-white shadowProfile overflow-hidden rounded-md`}
    >
      <ProfileCard />
    </div>
  );
};

export default ProfileDropDown;
