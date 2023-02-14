import { create } from "zustand";

export const useCoinsStore = create(() => ({
  coins: [],
}));
