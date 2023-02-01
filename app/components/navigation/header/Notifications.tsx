"use client";

import { BellIcon } from "@heroicons/react/outline";
import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";

const Notifications = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div>
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
