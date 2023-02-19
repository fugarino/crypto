import { BellIcon } from "@heroicons/react/outline";
import useNotifications from "../../../../hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";

const Notifications = () => {
  const { showNotificationSymbol, showDropdown, setShowDropdown } =
    useNotifications();

  return (
    <div>
      {showNotificationSymbol && (
        <div
          className="absolute z-10 left-[10px] top-[12px] border-2
         border-[#edebe9] w-3 h-3 pointer-events-none rounded-full bg-red-400"
        />
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
