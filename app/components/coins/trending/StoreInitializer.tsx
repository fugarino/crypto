"use client";

import { useRef } from "react";
import { useCoinsStore } from "../../../../src/CoinsStore";

const StoreInitializer = ({ data }: any) => {
  const initialized = useRef(false);
  if (!initialized.current) {
    useCoinsStore.setState({ coins: data });
    initialized.current = true;
  }
  return null;
};

export default StoreInitializer;
