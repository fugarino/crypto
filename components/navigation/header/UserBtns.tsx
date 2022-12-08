import { BellIcon } from "@heroicons/react/outline";

const UserBtns = () => {
  return (
    <div className="flex items-center justify-between h-full w-28 px-5">
      <button>
        <BellIcon className="h-5 w-5 text-gray-500" />
      </button>
      <div className="rounded-full w-8 h-8 bg-red-400"></div>
    </div>
  );
};

export default UserBtns;
