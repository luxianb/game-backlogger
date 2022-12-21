import create from "zustand";
import { persist } from "zustand/middleware";

const store = (set, get) => ({
  access_token: null,
  setToken: (token) => {
    set({ access_token: token });
  },
  removeToken: () => {
    set({ access_token: null });
  },
});

const persistConfig = {
  name: "gb_store",
  version: 1,
  // serialize: (state) => window.btoa(JSON.stringify(state)),
  // deserialize: (str) => JSON.parse(window.atob(str)),
  partialize: (state) => ({ access_token: state.access_token }),
};

export const useStore = create(persist(store, persistConfig));
