import styles from "./Favorites.module.css";

const Filler = () => {
  return (
    <>
      <li className={`bg-white h-[225px] rounded-lg ${styles.gradient}`}></li>
      <li className={`bg-white h-[225px] rounded-lg ${styles.gradient}`}></li>
      <li
        className={`hidden sm:flex bg-white h-[225px] rounded-lg ${styles.gradient}`}
      ></li>
      <li
        className={`hidden lg:flex bg-white h-[225px] rounded-lg ${styles.gradient}`}
      ></li>
      <li
        className={`hidden lg:flex bg-white h-[225px] rounded-lg ${styles.gradient}`}
      ></li>
    </>
  );
};

export default Filler;
