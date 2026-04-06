// src/components/TransactionTable.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setSearch,
  deleteTransaction,
} from "../features/financeSlice";

export default function TransactionTable({ onEdit }) {
  const dispatch = useDispatch();
  const { transactions, filter, search, role } = useSelector((s) => s.finance);

  // Apply filter + search
  const filtered = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .filter(
      (t) =>
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg px-3 py-2 text-sm flex-1"
        />
        <select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No transactions found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-left">
                <th className="px-4 py-2 rounded-l-lg">Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                {role === "admin" && (
                  <th className="px-4 py-2 rounded-r-lg">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {t.date}
                  </td>
                  <td className="px-4 py-3 font-medium dark:text-white">
                    {t.description}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {t.category}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        t.type === "income"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      t.type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}₹
                    {t.amount.toLocaleString("en-IN")}
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => onEdit(t)}
                        className="text-blue-500 hover:underline text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(deleteTransaction(t.id))}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
