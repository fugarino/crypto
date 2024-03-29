import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUserData } from "../contexts/UserDataContext";
import { db } from "../firebase";

const useNotifications = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationSymbol, setShowNotificationSymbol] = useState(false);
  const { notifications } = useUserData();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const docRef = collection(
          db,
          "users",
          currentUser.uid,
          "notifications"
        );
        const docSnap = await getDocs(docRef);

        const isNewNotification = docSnap.docs.some(
          (doc) => doc.data().read === false
        );
        setShowNotificationSymbol(isNewNotification);
      };
      getData();
    }
  }, [notifications, currentUser]);

  return {
    showNotificationSymbol,
    showDropdown,
    setShowDropdown,
  };
};

export default useNotifications;
