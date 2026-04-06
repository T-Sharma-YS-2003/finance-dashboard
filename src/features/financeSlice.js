// src/features/financeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { initialTransactions } from "../data/mockData";

// Load from localStorage
const loadState = () => {
  try {
    const data = localStorage.getItem("financeState");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saved = loadState();

const financeSlice = createSlice({
  name: "finance",
  initialState: {
    transactions: saved?.transactions || initialTransactions,
    filter: saved?.filter || "all",
    search: "",
    role: saved?.role || "viewer",
    activePage: "dashboard",
    darkMode: saved?.darkMode || false,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    addTransaction: (state, action) => {
      state.transactions.push({ id: Date.now(), ...action.payload });
    },
    editTransaction: (state, action) => {
      const i = state.transactions.findIndex((t) => t.id === action.payload.id);
      if (i !== -1) state.transactions[i] = action.payload;
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload,
      );
    },
  },
});

export const {
  setFilter,
  setSearch,
  setRole,
  setActivePage,
  toggleDarkMode,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = financeSlice.actions;

export default financeSlice.reducer;
