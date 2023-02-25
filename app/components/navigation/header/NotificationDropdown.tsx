"use client";

import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useUserData } from "../../../../contexts/UserDataContext";
import { db } from "../../../../firebase";
import sortTime from "../../../../util/sortTime";

interface IProfileDropDown {
  setShowDropdown: (arg0: boolean) => void;
}

export interface INotification {
  data: {
    comment: string;
    coin: string;
    userId: string;
    timestamp: any;
    read: boolean;
    notification: string;
  };
  id: string;
}

const NotificationDropdown = ({ setShowDropdown }: IProfileDropDown) => {
  const { notifications, setHandleNotificationClick } = useUserData();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const notificationsByLatest = useMemo(() => {
    return [...notifications].sort((a, b) => sortTime(a, b));
  }, [notifications]);

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

  const onNotificationClick = async (notification: INotification) => {
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
      className="absolute z-20 flex flex-col top-[55px] -right-2 xs:right-0 w-[calc(100vw-2rem)] xs:w-[calc(100vw-4rem)] sm:right-[50px]
       bg-white p-[4px] sm:w-[23rem] h-[22rem] shadowProfile rounded-md overflow-hidden"
    >
      <div className="overflow-y-scroll p-4 notificationScrollbar">
        <h1 className="font-semibold text-[1.1rem]">Notifications</h1>
        {notifications.length < 1 && (
          <div className="h-[16rem] flex flex-col items-center justify-center">
            <span className="block font-semibold text-[1.3rem] leading-5">
              Notifications
            </span>
            <span className="block font-light">will appear here</span>
          </div>
        )}
        {notificationsByLatest?.map((notification: INotification) => (
          <button
            onClick={() => onNotificationClick(notification)}
            key={notification.id}
            className="relative w-full text-left text-[0.9rem] block mt-2"
          >
            {!notification.data.read && (
              <div
                className="absolute -right-1 top-[7px] w-2 h-2 rounded-full
               inline-block mr-1 mb-[1px] bg-blue-300"
              />
            )}
            <span className="font-semibold">
              {notification.data.notification.slice(0, -24)}
            </span>
            <span className="font-light">
              {notification.data.notification.slice(-24)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
