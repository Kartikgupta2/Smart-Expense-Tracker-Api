const store = require('../models/expenseStore');
const { validateExpense } = require('../utils/validateExpense');

function listExpenses(req, res) {
  const { category } = req.query;
  const expenses = category ? store.getByCategory(category) : store.getAll();
  res.status(200).json({ count: expenses.length, expenses });
}

function createExpense(req, res) {
  const errors = validateExpense(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { title, amount, category, date } = req.body;
  const expense = store.addExpense({ title: title.trim(), amount, category: category.trim(), date });
  res.status(201).json(expense);
}

function removeExpense(req, res) {
  const { id } = req.params;
  const removed = store.deleteExpense(id);
  if (!removed) {
    return res.status(404).json({ error: `Expense with id ${id} not found` });
  }
  res.status(200).json({ message: 'Expense deleted', expense: removed });
}

function getTotals(req, res) {
  const total = store.getTotal();
  const byCategory = store.getTotalsByCategory();
  res.status(200).json({ total, byCategory });
}

module.exports = {
  listExpenses,
  createExpense,
  removeExpense,
  getTotals,
};
