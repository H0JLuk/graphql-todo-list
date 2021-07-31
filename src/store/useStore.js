import { useContext } from "react";
import { StoreContext } from "./StoreProvider";

const useStore = () => {
  const store = useContext(StoreContext);

  if (typeof store === "undefined") {
    throw new Error("use `useStore` only inside <StoreProvider />");
  }

  return store;
};

export default useStore;
