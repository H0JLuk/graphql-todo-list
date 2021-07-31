import { createContext } from "react";
import { TodoStore } from "./todoStore";

const storeValue = new TodoStore();

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>
  );
};
