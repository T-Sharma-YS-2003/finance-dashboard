# 💰 Finance Dashboard

A clean and interactive finance dashboard built with React, Redux Toolkit, and Tailwind CSS. Built as a frontend assignment to demonstrate UI design, state management, and data visualization skills.

🔗 **Live Demo**: https://tushar-finance-dashboard.netlify.app  
📁 **Repository**: https://github.com/T-Sharma-YS-2003/finance-dashboard

---

## 📸 Features

### 🏠 Dashboard
- Summary cards showing Total Balance, Income, and Expenses
- Area chart for Income vs Expense trend over time
- Donut chart for spending breakdown by category
- Bar chart for monthly income vs expense comparison

### 💳 Transactions
- Full transaction list with Date, Description, Category, Type, and Amount
- Search by description or category
- Filter by All / Income / Expense
- Export transactions as CSV file
- Admin can Add, Edit, and Delete transactions

### 💡 Insights
- Top spending category with percentage of total
- Savings rate for the last month
- Month-over-month expense change indicator
- All-time total saved
- Category breakdown with visual progress bars
- Monthly comparison table with savings % badges

### 🔐 Role Based UI
- **Viewer** — can only view data
- **Admin** — can add, edit, and delete transactions
- Switch roles via dropdown in the sidebar

### 🌙 Dark Mode
- Full dark mode support across all pages
- Toggle via sidebar button
- Preference saved across sessions

### 💾 Data Persistence
- All transactions, role, and dark mode preference saved to localStorage
- Data persists across page refreshes

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Redux Toolkit | State management |
| Tailwind CSS v3 | Styling |
| Recharts | Data visualization |
| Parcel | Bundler |

---

## 📁 Project Structure
src/
├── app/
│   └── store.js              # Redux store with localStorage sync
├── features/
│   └── financeSlice.js       # Single slice for all app state
├── components/
│   ├── Sidebar.jsx           # Fixed sidebar with nav + role switcher
│   ├── SummaryCards.jsx      # Balance, income, expense cards
│   ├── Charts.jsx            # Area, donut, and bar charts
│   ├── TransactionTable.jsx  # Filterable, searchable table
│   └── AddTransactionModal.jsx # Add/edit transaction modal
├── pages/
│   ├── Dashboard.jsx         # Main dashboard view
│   ├── Transactions.jsx      # Transactions page with export
│   └── Insights.jsx          # Insights and analytics
├── data/
│   └── mockData.js           # Mock transactions and categories
└── App.jsx                   # Root component with routing logic

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16 or above
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/finance-dashboard.git

# Navigate into the project
cd finance-dashboard

# Install dependencies
npm install
```

### Run locally
```bash
npm start
```

Open [http://localhost:1234](http://localhost:1234) in your browser.

### Build for production
```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 💡 Approach

- **Single Redux slice** for all state — transactions, filters, role, dark mode, active page — keeps the codebase lean and simple
- **No React Router** — active page is managed via Redux state to avoid extra dependencies
- **Mock data** — 20 pre-seeded transactions across 3 months for realistic chart and insight rendering
- **Role based UI** — simulated on the frontend via a dropdown; Admin unlocks add/edit/delete, Viewer is read-only
- **localStorage sync** — store subscribes to state changes and persists key data automatically

---

## 📊 Optional Enhancements Implemented

- ✅ Dark mode
- ✅ Data persistence via localStorage
- ✅ Export functionality (CSV)

---

## 📝 Assumptions

- No backend or real authentication — roles are simulated for demo purposes
- All data is mock/static — no real financial data is used
- Currency is Indian Rupee (₹)

---

## 👤 Author

Tushar Sharma
Email- ds9290988@gmail.com