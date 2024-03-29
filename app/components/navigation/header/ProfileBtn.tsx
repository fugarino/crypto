"use client";

import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";
import ProfileDropdown from "./ProfileDropdown";

const ProfileButton = () => {
  const [darkProfileBorder, setDarkProfileBorder] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentProfilePicture, setCurrentProfilePicture] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const coinRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setCurrentProfilePicture(coin.data().currentPhotoURL);
        } else {
          console.log("No items in watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  const onProfileMouseEnter = () => {
    setDarkProfileBorder(true);
  };

  const onProfileMouseLeave = () => {
    if (!showProfile) {
      setDarkProfileBorder(false);
    }
  };

  const onProfileClick = async () => {
    if (currentUser) {
      setShowProfile(!showProfile);
      !showProfile ? setDarkProfileBorder(true) : setDarkProfileBorder(false);
      if (currentUser.emailVerified) return;
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        displayName: currentUser.displayName,
      });
    }
  };

  return (
    <div className="w-[45px] h-[45px] flex items-center justify-center">
      <button
        className={`w-full h-full rounded-full border-[1px] flex items-center justify-center active:w-[40px] active:h-[40px] transition-all duration-200 ease-out ${
          darkProfileBorder ? "border-gray-500" : "border-gray-400"
        }`}
        onMouseEnter={onProfileMouseEnter}
        onMouseLeave={onProfileMouseLeave}
        onClick={onProfileClick}
      >
        <picture className="flex items-center justify-center">
          <img
            src={
              currentProfilePicture
                ? currentProfilePicture
                : "/Untitled (5).svg"
            }
            alt="profile"
            referrerPolicy="no-referrer"
            id="profile"
            className="w-[40px] h-[40px] rounded-full object-cover"
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
