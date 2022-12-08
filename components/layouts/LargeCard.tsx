interface ILargeCardProps {
  children: React.ReactNode;
}

const LargeCard = ({ children }: ILargeCardProps) => {
  return (
    <section className="bg-white p-4 rounded-lg shadow-md h-full max-w-[1600px] max-h-[1000px] min-h-[515px] mx-auto">
      {children}
    </section>
  );
};

export default LargeCard;
