"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";

interface IProfileDropDown {
  // eslint-disable-next-line
  setShowDropdown: (arg0: boolean) => void;
}

const NotificationDropdown = ({ setShowDropdown }: IProfileDropDown) => {
  const ref = useRef<any>(null);
  const { notifications }: any = useFavoriteCoins();

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowDropdown(false);
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
      className="absolute z-10 top-[55px] right-[50px] bg-white p-4 w-80 h-72 shadowProfile rounded-md"
    >
      <h1 className="font-semibold text-[1.1rem]">Notifications</h1>
      {notifications &&
        notifications.map((nofi: any) => (
          <Link
            href={`/coins/${nofi.data.coin}?id=${nofi.data.comment}`}
            key={nofi.id}
          >
            {nofi.data.notification}
          </Link>
        ))}
    </div>
  );
};

export default NotificationDropdown;
