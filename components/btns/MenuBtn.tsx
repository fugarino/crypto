interface IProps {
  children: React.ReactNode;
}

const MenuBtn = ({ children }: IProps) => {
  return (
    <button className="flex items-center justify-center w-10 h-10 bg-[#F0F0F0] rounded-[5px]">
      {children}
    </button>
  );
};

export default MenuBtn;
