import styles from "./Favorites.module.css";

const FavoritesPage = () => {
  return (
    <section className="px-12 max-w-[1400px] mx-auto">
      <header className="mt-1 ml-6">
        <h1 className="font-bold text-[1.5rem]">Favorites</h1>
        <h2 className="relative -top-2 text-[#67676d]">
          add and edit favorite coins
        </h2>
      </header>
      <div className="relative">
        <div className="absolute right-0 -top-8">
          <picture>
            <img src="/Edit_filledit.svg" alt="edit" />
          </picture>
        </div>
        <ul className="grid grid-cols-5 gap-4">
          <li className="bg-white h-[240px] rounded-lg shadow-md"></li>
          <li className="bg-white h-[240px] rounded-lg shadow-md"></li>
          <li className="bg-white h-[240px] rounded-lg shadow-md"></li>
          <li
            className={`bg-white h-[240px] rounded-lg ${styles.gradient}`}
          ></li>
          <li
            className={`bg-white h-[240px] rounded-lg ${styles.gradient}`}
          ></li>
          <li
            className={`bg-white h-[240px] rounded-lg ${styles.gradient}`}
          ></li>
          <li
            className={`bg-white h-[240px] rounded-lg ${styles.gradient}`}
          ></li>
          <li
            className={`bg-white h-[240px] rounded-lg ${styles.gradient}`}
          ></li>
          <li
            className={`bg-white h-[240px] rounded-lg ${styles.gradient}`}
          ></li>
        </ul>
      </div>
    </section>
  );
};

export default FavoritesPage;
