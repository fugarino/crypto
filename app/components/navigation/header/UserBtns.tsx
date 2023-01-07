import { BellIcon } from "@heroicons/react/outline";
import ProfileBtn from "./ProfileBtn";

const UserBtns = () => {
  return (
    <div className="flex items-center justify-between h-full w-[5rem]">
      <button>
        <BellIcon className="h-5 w-5 text-gray-500" />
      </button>
      <ProfileBtn />
    </div>
  );
};

export default UserBtns;
