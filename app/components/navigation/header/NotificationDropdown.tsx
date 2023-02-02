"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";

interface IProfileDropDown {
  // eslint-disable-next-line
  setShowDropdown: (arg0: boolean) => void;
}

const NotificationDropdown = ({ setShowDropdown }: IProfileDropDown) => {
  const ref = useRef<any>(null);
  const { notifications, setHandleNotificationClick }: any = useFavoriteCoins();
  const router = useRouter();

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

  const onNotificationClick = (notification: any) => {
    setHandleNotificationClick(notification.data.comment);
    router.push(`/coins/${notification.data.coin}`);
    setShowDropdown(false);
  };

  return (
    <div
      ref={ref}
      className="absolute z-10 top-[55px] right-[50px] bg-white p-4 w-80 h-72 shadowProfile rounded-md"
    >
      <h1 className="font-semibold text-[1.1rem]">Notifications</h1>
      {notifications &&
        notifications.map((nofi: any) => (
          <button onClick={() => onNotificationClick(nofi)} key={nofi.id}>
            {nofi.data.notification}
          </button>
        ))}
    </div>
  );
};

export default NotificationDropdown;
