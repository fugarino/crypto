"use client";

import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";
import { db } from "../../../../firebase";

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

  const onNotificationClick = async (notification: any) => {
    setHandleNotificationClick(notification.data.comment);
    router.push(`/coins/${notification.data.coin}`);
    setShowDropdown(false);

    const docRef = doc(
      db,
      "users",
      notification.data.userId,
      "notifications",
      notification.id
    );
    await updateDoc(docRef, {
      read: true,
    });
  };

  return (
    <div
      ref={ref}
      className="absolute z-10 flex flex-col top-[55px] right-[50px] bg-white p-[4px] w-80 h-72 shadowProfile rounded-md overflow-hidden "
    >
      <div className="overflow-y-scroll idkk p-4">
        <h1 className="font-semibold text-[1.1rem]">Notifications</h1>
        {notifications &&
          notifications
            .sort((a: any, b: any) => {
              const currentDate: any = new Date();
              try {
                const firstCommentDate: any = a?.data.timestamp.toDate();
                const secondCommentDate: any = b?.data.timestamp.toDate();
                const firstTimeDifference = currentDate - firstCommentDate;
                const secondTimeDifference = currentDate - secondCommentDate;
                return firstTimeDifference - secondTimeDifference;
              } catch (error) {
                return 0 - 0;
              }
            })
            .map((nofi: any) => (
              <button
                onClick={() => onNotificationClick(nofi)}
                key={nofi.id}
                className="text-left"
              >
                {!nofi.data.read && <span className="text-blue-200">new</span>}
                {nofi.data.notification}
              </button>
            ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
