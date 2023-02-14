import { useCoinsStore } from "../../../../src/CoinsStore";

const Helper = () => {
  const storeCoins = useCoinsStore.getState().coins;
  return (
    <div>
      {storeCoins.map((coin: any) => (
        <div key={coin.id}>{coin.name}</div>
      ))}
    </div>
  );
};

export default Helper;
