import Notifications from "./Notifications";
import ProfileBtn from "./ProfileBtn";

const UserBtns = () => {
  return (
    <div className="flex items-center justify-between h-full w-[5rem]">
      <Notifications />
      <ProfileBtn />
    </div>
  );
};

export default UserBtns;
