import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { storage } from "../../../firebase";
import LightInputField from "../../auth/forms/LightInputField";

interface IProfileEditForm {
  // eslint-disable-next-line
  setEditProfile: (arg0: boolean) => void;
}

const ProfileEditForm = ({ setEditProfile }: IProfileEditForm) => {
  const { currentUser }: any = useAuth();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");

  const [updatedDisplayName, setUpdatedDisplayName] = useState(
    currentUser.displayName
  );

  const upload = async (file: any, currentUser: any) => {
    const fileRef = ref(storage, currentUser.uid);
    setLoading(true);
    await uploadBytes(fileRef, file);
    const photoURL: any = await getDownloadURL(fileRef);
    updateProfile(currentUser, { photoURL: photoURL });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (profilePhoto || updatedDisplayName !== currentUser.displayName) {
        if (profilePhoto) {
          await upload(profilePhoto, currentUser);
        }
        if (updatedDisplayName !== currentUser.displayName) {
          await updateProfile(currentUser, {
            displayName: updatedDisplayName,
          });
        }
        window.location.reload();
      } else {
        setEditProfile(false);
      }
    } catch {
      setError("Unable to update profile");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedDisplayName(e.target.value);
  };

  return (
    <form onSubmit={handleProfileSubmit}>
      <button
        type="submit"
        id="profile"
        disabled={loading}
        className="flex justify-center border-2 border-slate-400 text-slate-500 rounded-[5px] hover:border-slate-500 hover:text-slate-600 absolute right-4 py-1 px-6 -top-[47px]"
      >
        <span>Save</span>
      </button>
      {error && <h1 className="text-red-500">{error}</h1>}
      <LightInputField
        labelText="Display name"
        type="text"
        name="displayName"
        placeholder="display name..."
        value={updatedDisplayName}
        defaultValue={currentUser.displayName}
        onChange={handleInputChange}
      />
      <div className="relative -top-2 flex flex-col transition-all duration-150 ease-out mb-2">
        <label htmlFor="profileImage" className="font-medium">
          Profile picture
        </label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="py-1"
          onChange={handleFileChange}
        />
      </div>
      <hr className="pt-2" />
    </form>
  );
};

export default ProfileEditForm;
