const CoinSectionHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={`text-[#67676d] mt-6 xs:mt-8 px-[2rem] xs:px-12 sm:px-20 max-w-[1400px] mx-auto ${className}`}
    >
      {children}
    </h3>
  );
};

export default CoinSectionHeader;
