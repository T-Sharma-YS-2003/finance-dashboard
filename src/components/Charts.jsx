// src/components/Charts.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`px-4 py-3 rounded-xl shadow-lg text-xs ${darkMode ? "bg-gray-900 border border-gray-700 text-white" : "bg-white border border-gray-200 text-gray-800"}`}
      >
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: ₹{Number(p.value).toLocaleString("en-IN")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Charts() {
  const { transactions, darkMode } = useSelector((s) => s.finance);

  const tickColor = darkMode ? "#6b7280" : "#9ca3af";
  const gridColor = darkMode ? "#1f2937" : "#f3f4f6";

  // Monthly data
  const monthlyData = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!monthlyData[month])
      monthlyData[month] = { month, income: 0, expense: 0 };
    if (t.type === "income") monthlyData[month].income += t.amount;
    if (t.type === "expense") monthlyData[month].expense += t.amount;
  });
  const lineData = Object.values(monthlyData).map((m) => ({
    month: m.month,
    Balance: m.income - m.expense,
    Income: m.income,
    Expense: m.expense,
  }));

  // Pie data
  const categoryData = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    });
  const pieData = Object.entries(categoryData)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Area Chart — Income vs Expense */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md col-span-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200">
            Income vs Expense
          </h2>
          <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">
            Monthly
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Track your cash flow over time
        </p>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={lineData}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: tickColor }} />
            <YAxis tick={{ fontSize: 10, fill: tickColor }} />
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            <Legend
              formatter={(v) => (
                <span
                  style={{
                    color: darkMode ? "#d1d5db" : "#374151",
                    fontSize: 11,
                  }}
                >
                  {v}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="Income"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#incomeGrad)"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="Expense"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#expenseGrad)"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="Balance"
              stroke="#3b82f6"
              strokeWidth={2.5}
              strokeDasharray="5 3"
              fill="url(#balanceGrad)"
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Donut Pie Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md col-span-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200">
            Spending Breakdown
          </h2>
          <span className="text-xs bg-red-50 dark:bg-red-900 text-red-500 dark:text-red-300 px-2 py-0.5 rounded-full">
            Expenses
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-4">Where your money is going</p>
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={85}
              innerRadius={45}
              paddingAngle={3}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Legend
              formatter={(v) => (
                <span
                  style={{
                    color: darkMode ? "#d1d5db" : "#374151",
                    fontSize: 11,
                  }}
                >
                  {v}
                </span>
              )}
            />
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart — full width */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md col-span-1 md:col-span-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200">
            Monthly Balance Overview
          </h2>
          <span className="text-xs bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full">
            All Months
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Income and expense bars side by side
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={lineData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: tickColor }} />
            <YAxis tick={{ fontSize: 10, fill: tickColor }} />
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            <Legend
              formatter={(v) => (
                <span
                  style={{
                    color: darkMode ? "#d1d5db" : "#374151",
                    fontSize: 11,
                  }}
                >
                  {v}
                </span>
              )}
            />
            <Bar dataKey="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
