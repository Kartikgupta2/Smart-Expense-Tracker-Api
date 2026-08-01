const { randomUUID } = require('crypto');

// In-memory store. Data resets whenever the server restarts.
let expenses = [];

function resetStore() {
  expenses = [];
}

function getAll() {
  return expenses;
}

function getByCategory(category) {
  return expenses.filter(
    (e) => e.category.toLowerCase() === category.toLowerCase()
  );
}

function addExpense({ title, amount, category, date }) {
  const expense = {
    id: randomUUID(),
    title,
    amount,
    category,
    date,
  };
  expenses.push(expense);
  return expense;
}

function deleteExpense(id) {
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) return null;
  const [removed] = expenses.splice(index, 1);
  return removed;
}

function getTotal() {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

function getTotalsByCategory() {
  const totals = {};
  for (const e of expenses) {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  }
  return totals;
}

module.exports = {
  resetStore,
  getAll,
  getByCategory,
  addExpense,
  deleteExpense,
  getTotal,
  getTotalsByCategory,
};
