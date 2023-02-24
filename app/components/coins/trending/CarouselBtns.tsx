const CarouselBtns = ({
  left,
  right,
  handlePrevClick,
  handleNextClick,
}: {
  left: boolean;
  right: boolean;
  handlePrevClick: () => void;
  handleNextClick: () => void;
}) => {
  return (
    <>
      <button
        className="absolute hidden xs:flex items-center justify-center left-12 top-[90px] w-12 h-12 rounded-full bg-gray-500 bg-opacity-25 disabled:hidden"
        disabled={left}
        onClick={handlePrevClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 relative right-[1px] text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        className="absolute hidden xs:flex items-center justify-center right-12 top-[90px] w-12 h-12 rounded-full bg-gray-500 bg-opacity-25 disabled:hidden"
        disabled={right}
        onClick={handleNextClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 relative left-[1px] text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </>
  );
};

export default CarouselBtns;
