# Smart Expense Tracker API

A REST API for managing personal expenses — add, view, filter by category, delete,
and calculate totals. Built with Node.js and Express, with in-memory storage.

## What it does

- `POST /api/expenses` — add an expense (`title`, `amount`, `category`, `date`)
- `GET /api/expenses` — view all expenses
- `GET /api/expenses?category=Food` — filter expenses by category
- `GET /api/expenses/total` — total expenses overall and broken down by category
- `DELETE /api/expenses/:id` — delete an expense by id
- `GET /api-docs` — interactive Swagger/OpenAPI documentation (bonus feature)

Data is stored in memory and resets whenever the server restarts.

## Tech stack

- Node.js + Express
- Jest + Supertest for testing
- swagger-jsdoc + swagger-ui-express for API docs

## Requirements

- Node.js 18 or later
- npm

## Install

```bash
npm install
```

## Run the server

```bash
npm start
```

The server starts on `http://localhost:3000` by default (set the `PORT`
environment variable to use a different port).

- API base URL: `http://localhost:3000/api/expenses`
- Swagger docs: `http://localhost:3000/api-docs`

## Run the tests

```bash
npm test
```

This runs the full Jest + Supertest suite (13 tests) covering all endpoints,
including validation errors and edge cases (missing fields, invalid amount,
invalid date, deleting a non-existent expense, unknown routes).

## Example usage

Add an expense:

```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Groceries","amount":500,"category":"Food","date":"2026-07-30"}'
```

Get all expenses:

```bash
curl http://localhost:3000/api/expenses
```

Filter by category:

```bash
curl "http://localhost:3000/api/expenses?category=Food"
```

Get totals:

```bash
curl http://localhost:3000/api/expenses/total
```

Delete an expense:

```bash
curl -X DELETE http://localhost:3000/api/expenses/<id>
```

## Project structure

```
your-repo/
  README.md
  AI_NOTES.md
  src/
    app.js                        # Express app, middleware, Swagger setup
    server.js                     # entry point, starts the HTTP server
    routes/expenses.js            # route definitions + Swagger JSDoc annotations
    controllers/expenseController.js  # request handlers / business logic
    models/expenseStore.js        # in-memory data store
    utils/validateExpense.js      # input validation
  tests/
    expenses.test.js              # Jest + Supertest test suite
  package.json
```

## Design notes

- **Validation**: `title`, `category`, and `date` must be non-empty strings;
  `amount` must be a positive number; `date` must parse as a valid date.
  Invalid requests return `400` with a list of specific error messages.
- **Category filtering** is case-insensitive (`?category=food` matches `Food`).
- **Deleting** a non-existent id returns `404` rather than silently succeeding.
- **Errors**: unknown routes return `404`; unexpected server errors are caught
  by a central error handler and return `500`.
