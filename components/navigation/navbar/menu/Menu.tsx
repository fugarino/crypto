import {
  BookmarkIcon,
  ChatAlt2Icon,
  HomeIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import CoinIcon from "./CoinIcon";
import MenuBtn from "./MenuBtn";

const Menu = () => {
  return (
    <div className="flex flex-col items-center justify-between h-[3.5rem] sm:h-[calc(100%-3.5rem)]">
      <div className="w-full h-full sm:h-[70%] sm:min-h-[320px] sm:max-h-[650px] flex items-center justify-center">
        <menu
          className="w-full px-10 sm:px-0 sm:h-[70%] sm:min-h-[300px] sm:max-h-[350px]
          flex sm:flex-col items-center justify-between"
        >
          <MenuBtn url="/" text="Home">
            <HomeIcon className="menuIcon" />
          </MenuBtn>
          <MenuBtn url="/coins" text="Coins">
            <CoinIcon />
          </MenuBtn>
          <MenuBtn url="/forum" text="Forum">
            <ChatAlt2Icon className="menuIcon" />
          </MenuBtn>
          <MenuBtn url="/favorites" text="Favorites">
            <BookmarkIcon className="menuIcon" />
          </MenuBtn>
        </menu>
      </div>
      <aside className="hidden sm:flex items-center justify-center w-full h-20 mt-6">
        <button className="flex items-center justify-center w-10 h-10 rounded-[5px] hover:bg-gray-200">
          <LogoutIcon className="menuIcon" />
        </button>
      </aside>
    </div>
  );
};

export default Menu;
