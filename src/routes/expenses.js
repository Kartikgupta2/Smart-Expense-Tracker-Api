const express = require('express');
const {
  listExpenses,
  createExpense,
  removeExpense,
  getTotals,
} = require('../controllers/expenseController');

const router = express.Router();

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses (optionally filtered by category)
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter expenses by category
 *     responses:
 *       200:
 *         description: List of expenses
 *   post:
 *     summary: Add a new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, amount, category, date]
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Expense created
 *       400:
 *         description: Validation error
 */
router.get('/', listExpenses);
router.post('/', createExpense);

/**
 * @swagger
 * /api/expenses/total:
 *   get:
 *     summary: Get total expenses overall and by category
 *     responses:
 *       200:
 *         description: Totals
 */
router.get('/total', getTotals);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Expense deleted
 *       404:
 *         description: Expense not found
 */
router.delete('/:id', removeExpense);

module.exports = router;
