// src/pages/Dashboard.jsx
import React from "react";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { role } = useSelector((s) => s.finance);
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">{today}</p>
        </div>
        <span
          className={`self-start sm:self-auto px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase ${
            role === "admin"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {role === "admin" ? "🛠 Admin" : "👁 Viewer"}
        </span>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Divider */}
      <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

      {/* Charts Section */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">
          📊 Analytics
        </h2>
        <Charts />
      </div>
    </div>
  );
}
