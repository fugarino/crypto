"use client";

import { PencilIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import ProfileEditForm from "./ProfileEditForm";

const ProfileCard = () => {
  const { currentUser, logout }: any = useAuth();
  const [editProfile, setEditProfile] = useState(false);

  return (
    <section className="relative -top-[16px] transition-all ease-out duration-150">
      <div className="relative h-20 bg-slate-300">
        <picture>
          <img
            src={
              currentUser.photoURL ? currentUser.photoURL : "/Untitled (5).svg"
            }
            alt="profile picture"
            referrerPolicy="no-referrer"
            className={`relative -bottom-[30px] ${
              !editProfile ? "-right-[115px]" : "-right-[2.5rem]"
            } w-24 h-24 rounded-full border-4 border-white transition-all duration-150 ease-out object-cover`}
          />
        </picture>
      </div>
      <div className="relative mt-14 px-4">
        {editProfile ? (
          <>
            <ProfileEditForm setEditProfile={setEditProfile} />
            <button
              onClick={() => setEditProfile(false)}
              id="profile"
              className="flex items-center justify-center rounded-[5px] h-[24px] mx-auto mt-2 mb-1"
            >
              <span id="profile" className="text-slate-600 hover:text-black">
                Discard changes
              </span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditProfile(true)}
              id="profile"
              className="absolute right-[75px] -top-[47px] w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-slate-200 transition-all duration-150 ease-out"
            >
              <PencilIcon className="text-gray-600 w-[20px] h-[20px] pointer-events-none" />
            </button>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-lg mt-1">
                {currentUser.displayName}
              </h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
            <div className="flex justify-between mt-4">
              <div></div>
              <span className="text-gray-500 text-sm cursor-pointer hover:text-black">
                delete account
              </span>
            </div>
            <hr className="mb-4" />
            <button
              onClick={logout}
              className="border-2 hover:border-slate-500 hover:text-slate-600 rounded-md border-slate-400 text-slate-500 font-semibold w-full py-2"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileCard;
