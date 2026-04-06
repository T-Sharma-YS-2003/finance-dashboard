// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "../features/financeSlice";

const store = configureStore({
  reducer: {
    finance: financeReducer,
  },
});

// Save to localStorage on every state change
store.subscribe(() => {
  try {
    const { transactions, filter, role, darkMode } = store.getState().finance;
    localStorage.setItem(
      "financeState",
      JSON.stringify({
        transactions,
        filter,
        role,
        darkMode,
      }),
    );
  } catch {
    /* ignore */
  }
});

export default store;
