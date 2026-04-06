// src/components/AddTransactionModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../features/financeSlice";
import { CATEGORIES } from "../data/mockData";

const empty = {
  description: "",
  amount: "",
  category: "Food",
  type: "expense",
  date: "",
};

export default function AddTransactionModal({ onClose, existing }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.date)
      return alert("Please fill all fields.");
    if (existing) {
      dispatch(editTransaction({ ...form, amount: Number(form.amount) }));
    } else {
      dispatch(addTransaction({ ...form, amount: Number(form.amount) }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
          {existing ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg px-3 py-2 text-sm"
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg px-3 py-2 text-sm"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {existing ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
