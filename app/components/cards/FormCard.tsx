interface ILargeCardProps {
  children: React.ReactNode;
}

const FormCard = ({ children }: ILargeCardProps) => {
  return (
    <section className="min-h-[515px] h-full">
      <div className="flex h-full lg:space-x-14">
        <aside className="h-full lg:w-[50%] p-2 hidden lg:flex items-center justify-center pointer-events-none">
          <div className="top-0 h-[60%]">
            <picture>
              <img src="/Frame1.svg" alt="rocket" className="h-full" />
            </picture>
          </div>
        </aside>
        <article className="w-full h-full lg:w-[50%] flex flex-col justify-center items-center">
          {children}
        </article>
      </div>
    </section>
  );
};

export default FormCard;
