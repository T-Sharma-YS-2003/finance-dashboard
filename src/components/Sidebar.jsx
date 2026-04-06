// src/components/Sidebar.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivePage,
  setRole,
  toggleDarkMode,
} from "../features/financeSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { activePage, role, darkMode } = useSelector((s) => s.finance);

  const navItems = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "transactions", label: "💳 Transactions" },
    { id: "insights", label: "💡 Insights" },
  ];

  return (
    <div className="w-56 min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-8 mt-2">💰 FinanceApp</h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => dispatch(setActivePage(item.id))}
            className={`text-left px-4 py-2 rounded-lg transition-colors ${
              activePage === item.id
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 mb-3"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Role Switcher */}
      <div className="pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 mb-2">Role</p>
        <select
          value={role}
          onChange={(e) => dispatch(setRole(e.target.value))}
          className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded-lg border border-gray-600"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">🛠 Admin</option>
        </select>
      </div>
    </div>
  );
}
