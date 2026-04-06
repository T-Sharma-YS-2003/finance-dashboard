// src/pages/Insights.jsx
import React from "react";
import { useSelector } from "react-redux";

export default function Insights() {
  const { transactions } = useSelector((s) => s.finance);

  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");

  // Category totals
  const categoryTotals = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });
  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  );
  const topCategory = sortedCategories[0];
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
  const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);

  // Monthly totals
  const monthlyTotals = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!monthlyTotals[month]) monthlyTotals[month] = { income: 0, expense: 0 };
    monthlyTotals[month][t.type] += t.amount;
  });
  const months = Object.entries(monthlyTotals).sort();

  // Last month stats
  const lastMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];
  const savingsRate = lastMonth
    ? (
        ((lastMonth[1].income - lastMonth[1].expense) / lastMonth[1].income) *
        100
      ).toFixed(1)
    : 0;
  const expenseChange =
    lastMonth && prevMonth
      ? (
          ((lastMonth[1].expense - prevMonth[1].expense) /
            prevMonth[1].expense) *
          100
        ).toFixed(1)
      : null;

  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Insights
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        A deeper look at your financial patterns
      </p>

      {/* Top stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Top category */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
            🏆 Top Spending
          </p>
          {topCategory ? (
            <>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {topCategory[0]}
              </p>
              <p className="text-red-500 dark:text-red-400 font-semibold text-sm mt-1">
                ₹{topCategory[1].toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {((topCategory[1] / totalExpense) * 100).toFixed(1)}% of total
                expenses
              </p>
            </>
          ) : (
            <p className="text-gray-400 text-sm">No data</p>
          )}
        </div>

        {/* Savings rate */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
            💰 Savings Rate
          </p>
          {lastMonth ? (
            <>
              <p
                className={`text-lg font-bold ${Number(savingsRate) >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {savingsRate}%
              </p>
              <p className="text-gray-400 text-xs mt-1">{lastMonth[0]}</p>
              <p className="text-xs text-gray-400 mt-1">
                {Number(savingsRate) >= 20
                  ? "🟢 Healthy savings"
                  : "🔴 Save more"}
              </p>
            </>
          ) : (
            <p className="text-gray-400 text-sm">No data</p>
          )}
        </div>

        {/* Expense change */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
            📊 Expense Change
          </p>
          {expenseChange !== null ? (
            <>
              <p
                className={`text-lg font-bold ${Number(expenseChange) <= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {Number(expenseChange) > 0 ? "+" : ""}
                {expenseChange}%
              </p>
              <p className="text-gray-400 text-xs mt-1">vs previous month</p>
              <p className="text-xs text-gray-400 mt-1">
                {Number(expenseChange) <= 0
                  ? "🟢 Spending less"
                  : "🔴 Spending more"}
              </p>
            </>
          ) : (
            <p className="text-gray-400 text-sm">Need 2+ months</p>
          )}
        </div>

        {/* Total saved */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
            🏦 Total Saved
          </p>
          <p
            className={`text-lg font-bold ${totalIncome - totalExpense >= 0 ? "text-blue-500" : "text-red-500"}`}
          >
            ₹{(totalIncome - totalExpense).toLocaleString("en-IN")}
          </p>
          <p className="text-gray-400 text-xs mt-1">All time balance</p>
          <p className="text-xs text-gray-400 mt-1">
            From ₹{totalIncome.toLocaleString("en-IN")} income
          </p>
        </div>
      </div>

      {/* Category breakdown with progress bars */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
          📂 Spending by Category
        </h2>
        {sortedCategories.length === 0 ? (
          <p className="text-gray-400 text-sm">No data</p>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedCategories.map(([cat, amt], i) => {
              const pct = ((amt / totalExpense) * 100).toFixed(1);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      {cat}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ₹{amt.toLocaleString("en-IN")} · {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: COLORS[i % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Monthly comparison table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
          📅 Monthly Comparison
        </h2>
        {months.length === 0 ? (
          <p className="text-gray-400 text-sm">No data</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-left text-xs uppercase tracking-wide">
                <th className="px-4 py-3 rounded-l-xl">Month</th>
                <th className="px-4 py-3">Income</th>
                <th className="px-4 py-3">Expense</th>
                <th className="px-4 py-3">Savings %</th>
                <th className="px-4 py-3 rounded-r-xl">Balance</th>
              </tr>
            </thead>
            <tbody>
              {months.map(([month, data], i) => {
                const balance = data.income - data.expense;
                const rate =
                  data.income > 0
                    ? ((balance / data.income) * 100).toFixed(1)
                    : "0.0";
                return (
                  <tr
                    key={month}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-700 dark:text-white">
                      {month}
                    </td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">
                      +₹{data.income.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-red-500 dark:text-red-400 font-medium">
                      -₹{data.expense.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          Number(rate) >= 20
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {rate}%
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 font-bold ${
                        balance >= 0
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      ₹{balance.toLocaleString("en-IN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
