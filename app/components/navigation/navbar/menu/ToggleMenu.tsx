"use client";

import styles from "./ToggleMenu.module.css";

interface IToggleMenuProps {
  isMenuOpen: boolean;
  handleMenuClick: () => void;
}

const ToggleMenu = ({ isMenuOpen, handleMenuClick }: IToggleMenuProps) => {
  return (
    <button
      aria-label="open menu"
      className={`z-20 w-[33px] h-[43px]
       before:bg-black after:bg-black
      ${styles.menuBtn} ${isMenuOpen && styles.open}`}
      onClick={handleMenuClick}
    ></button>
  );
};

export default ToggleMenu;
