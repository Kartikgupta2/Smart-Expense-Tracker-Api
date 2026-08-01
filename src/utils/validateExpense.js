// Validates the body of an "add expense" request.
// Returns an array of error strings; empty array means the payload is valid.
function validateExpense(body) {
  const errors = [];

  if (!body || typeof body !== 'object') {
    return ['Request body must be a JSON object'];
  }

  const { title, amount, category, date } = body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('title is required and must be a non-empty string');
  }

  if (amount === undefined || amount === null || typeof amount !== 'number' || Number.isNaN(amount)) {
    errors.push('amount is required and must be a number');
  } else if (amount <= 0) {
    errors.push('amount must be greater than 0');
  }

  if (!category || typeof category !== 'string' || !category.trim()) {
    errors.push('category is required and must be a non-empty string');
  }

  if (!date || typeof date !== 'string' || Number.isNaN(Date.parse(date))) {
    errors.push('date is required and must be a valid date string (e.g. YYYY-MM-DD)');
  }

  return errors;
}

module.exports = { validateExpense };
