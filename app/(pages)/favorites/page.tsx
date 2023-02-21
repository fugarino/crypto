import FavoriteCoins from "./FavoriteCoins";

const FavoritesPage = () => {
  return (
    <section className="px-8 sm:px-12 max-w-[1400px] mx-auto">
      <header className="mt-1 ml-6">
        <h1 className="font-bold text-[1.5rem]">Bookmark</h1>
        <h2 className="relative -top-2 text-[#67676d]">favorite coins</h2>
      </header>
      <div className="relative">
        <FavoriteCoins />
      </div>
    </section>
  );
};

export default FavoritesPage;
