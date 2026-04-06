// src/components/SummaryCards.jsx
import React from "react";
import { useSelector } from "react-redux";

const cards = (balance, totalIncome, totalExpense) => [
  {
    label: "Total Balance",
    value: balance,
    icon: "🏦",
    gradient: "from-blue-500 to-blue-700",
    sub: "All time",
  },
  {
    label: "Total Income",
    value: totalIncome,
    icon: "📈",
    gradient: "from-emerald-400 to-emerald-600",
    sub: "All time",
  },
  {
    label: "Total Expenses",
    value: totalExpense,
    icon: "📉",
    gradient: "from-rose-400 to-rose-600",
    sub: "All time",
  },
];

export default function SummaryCards() {
  const { transactions } = useSelector((s) => s.finance);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
      {cards(balance, totalIncome, totalExpense).map((card) => (
        <div
          key={card.label}
          className={`bg-gradient-to-br ${card.gradient} text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-200`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{card.icon}</span>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
              {card.sub}
            </span>
          </div>
          <p className="text-sm opacity-80 mb-1">{card.label}</p>
          <p className="text-3xl font-extrabold tracking-tight">
            ₹{card.value.toLocaleString("en-IN")}
          </p>
        </div>
      ))}
    </div>
  );
}
