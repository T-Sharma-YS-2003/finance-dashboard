// src/App.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

export default function App() {
  const { activePage, darkMode } = useSelector((s) => s.finance);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const renderPage = () => {
    if (activePage === "dashboard") return <Dashboard />;
    if (activePage === "transactions") return <Transactions />;
    if (activePage === "insights") return <Insights />;
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar — fixed, won't scroll */}
      <div className="fixed top-0 left-0 h-screen w-56 z-50">
        <Sidebar />
      </div>

      {/* Main content — offset by sidebar width */}
      <main className="ml-56 flex-1 p-6 overflow-y-auto min-h-screen">
        {renderPage()}
      </main>
    </div>
  );
}
