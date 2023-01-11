interface ICarouselBtnProps {
  handleClick: () => void;
  className: string;
}

const CarouselBtnR = ({ handleClick }: ICarouselBtnProps) => {
  return (
    <button
      className={`absolute flex items-center justify-center text-white right-12
	   top-[95px] w-12 h-12 bg-gray-500 rounded-full bg-opacity-25 
	   hover:bg-opacity-30 transition-all duration-300 ease-out`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  );
};

export default CarouselBtnR;
