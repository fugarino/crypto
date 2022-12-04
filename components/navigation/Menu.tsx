import { BookmarkIcon, ChatAlt2Icon, HomeIcon } from "@heroicons/react/outline";
import MenuBtn from "../btns/MenuBtn";
import CoinIcon from "./CoinIcon";

const Menu = () => {
  return (
    <div className="flex flex-col items-center justify-between h-[calc(100%-4rem)]">
      <menu className="w-full h-[60%] min-h-[400px] max-h-[600px] flex flex-col items-center justify-center space-y-12">
        <MenuBtn>
          <HomeIcon className="menuBtn" />
        </MenuBtn>
        <MenuBtn>
          <CoinIcon />
        </MenuBtn>
        <MenuBtn>
          <ChatAlt2Icon className="menuBtn" />
        </MenuBtn>
        <MenuBtn>
          <BookmarkIcon className="menuBtn" />
        </MenuBtn>
      </menu>
      <aside className="w-full h-20">hi</aside>
    </div>
  );
};

export default Menu;
