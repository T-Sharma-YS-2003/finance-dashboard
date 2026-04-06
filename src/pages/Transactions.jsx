// src/pages/Transactions.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";

// Export transactions as CSV
const exportCSV = (transactions) => {
  const headers = ["ID", "Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) =>
    [t.id, t.date, t.description, t.category, t.type, t.amount].join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
};

export default function Transactions() {
  const { role, transactions } = useSelector((s) => s.finance);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Transactions
        </h1>
        <div className="flex gap-2">
          {/* Export CSV — always visible */}
          <button
            onClick={() => exportCSV(transactions)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            ⬇ Export CSV
          </button>
          {/* Add Transaction — admin only */}
          {role === "admin" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <TransactionTable onEdit={handleEdit} />
      </div>

      {/* Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={handleClose}
          existing={editingTransaction}
        />
      )}
    </div>
  );
}
