"use client";

import { BellIcon } from "@heroicons/react/outline";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";
import { db } from "../../../../firebase";
import NotificationDropdown from "./NotificationDropdown";

const Notifications = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationSymbol, setShowNotificationSymbol] = useState(false);
  const { notifications }: any = useFavoriteCoins();
  const { currentUser }: any = useAuth();

  useEffect(() => {
    const getData = async () => {
      const docRef = collection(db, "users", currentUser.uid, "notifications");
      const docSnap = await getDocs(docRef);

      const isNewNotification = docSnap.docs.some(
        (doc) => doc.data().read === false
      );
      setShowNotificationSymbol(isNewNotification);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  return (
    <div>
      {showNotificationSymbol && (
        <div className="absolute z-10 left-[10px] top-[12px] border-2 border-[#edebe9] w-3 h-3 rounded-full bg-red-400"></div>
      )}
      <button onClick={() => setShowDropdown((prevState) => !prevState)}>
        <BellIcon className="h-5 w-5 text-gray-500 relative top-1" />
      </button>
      {showDropdown && (
        <NotificationDropdown setShowDropdown={setShowDropdown} />
      )}
    </div>
  );
};

export default Notifications;
