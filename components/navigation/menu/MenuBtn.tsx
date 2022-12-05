import Link from "next/link";

interface IProps {
  url: string;
  children: React.ReactNode;
}

const MenuBtn = ({ url, children }: IProps) => {
  return (
    <li>
      <Link href={url}>
        <button className="flex items-center justify-center w-10 h-10 rounded-[5px] hover:bg-gray-200">
          {children}
        </button>
      </Link>
    </li>
  );
};

export default MenuBtn;
