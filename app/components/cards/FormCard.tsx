import Image from "next/image";

interface ILargeCardProps {
  children: React.ReactNode;
}

const FormCard = ({ children }: ILargeCardProps) => {
  return (
    <section className="bg-white p-4 rounded-lg shadow-md h-full max-w-[1400px] max-h-[1000px] min-h-[515px] mx-auto">
      <div className="flex h-full max-h-[1000px]">
        <aside className="relative lg:w-1/2 p-2 hidden lg:flex items-center justify-center pointer-events-none">
          <div className="absolute">
            <Image
              src="/RocketB.svg"
              width={500}
              height={500}
              alt="rocket illustration"
            />
          </div>
        </aside>
        <article className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          <div className="w-5/6 max-w-[26rem]">{children}</div>
        </article>
      </div>
    </section>
  );
};

export default FormCard;
