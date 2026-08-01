const request = require('supertest');
const app = require('../src/app');
const store = require('../src/models/expenseStore');

beforeEach(() => {
  // Ensure each test starts with a clean slate since the store is in-memory
  store.resetStore();
});

describe('POST /api/expenses', () => {
  it('creates a new expense with valid data', async () => {
    const res = await request(app).post('/api/expenses').send({
      title: 'Groceries',
      amount: 450.5,
      category: 'Food',
      date: '2026-07-01',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Groceries');
    expect(res.body.amount).toBe(450.5);
    expect(res.body.category).toBe('Food');
  });

  it('rejects a request missing required fields', async () => {
    const res = await request(app).post('/api/expenses').send({ title: 'Incomplete' });

    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  it('rejects a negative or zero amount', async () => {
    const res = await request(app).post('/api/expenses').send({
      title: 'Bad expense',
      amount: -10,
      category: 'Misc',
      date: '2026-07-01',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.includes('amount'))).toBe(true);
  });

  it('rejects an invalid date string', async () => {
    const res = await request(app).post('/api/expenses').send({
      title: 'Bad date',
      amount: 10,
      category: 'Misc',
      date: 'not-a-date',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.includes('date'))).toBe(true);
  });
});

describe('GET /api/expenses', () => {
  it('returns an empty list when there are no expenses', async () => {
    const res = await request(app).get('/api/expenses');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(0);
    expect(res.body.expenses).toEqual([]);
  });

  it('returns all expenses', async () => {
    await request(app).post('/api/expenses').send({
      title: 'Bus ticket',
      amount: 20,
      category: 'Travel',
      date: '2026-07-01',
    });
    await request(app).post('/api/expenses').send({
      title: 'Coffee',
      amount: 5,
      category: 'Food',
      date: '2026-07-02',
    });

    const res = await request(app).get('/api/expenses');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(2);
  });

  it('filters expenses by category', async () => {
    await request(app).post('/api/expenses').send({
      title: 'Bus ticket',
      amount: 20,
      category: 'Travel',
      date: '2026-07-01',
    });
    await request(app).post('/api/expenses').send({
      title: 'Coffee',
      amount: 5,
      category: 'Food',
      date: '2026-07-02',
    });

    const res = await request(app).get('/api/expenses?category=Food');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
    expect(res.body.expenses[0].title).toBe('Coffee');
  });

  it('filtering is case-insensitive', async () => {
    await request(app).post('/api/expenses').send({
      title: 'Coffee',
      amount: 5,
      category: 'Food',
      date: '2026-07-02',
    });

    const res = await request(app).get('/api/expenses?category=food');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });
});

describe('GET /api/expenses/total', () => {
  it('returns 0 totals when there are no expenses', async () => {
    const res = await request(app).get('/api/expenses/total');
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(0);
    expect(res.body.byCategory).toEqual({});
  });

  it('calculates overall total and totals by category', async () => {
    await request(app).post('/api/expenses').send({
      title: 'Bus ticket',
      amount: 20,
      category: 'Travel',
      date: '2026-07-01',
    });
    await request(app).post('/api/expenses').send({
      title: 'Coffee',
      amount: 5,
      category: 'Food',
      date: '2026-07-02',
    });
    await request(app).post('/api/expenses').send({
      title: 'Lunch',
      amount: 15,
      category: 'Food',
      date: '2026-07-03',
    });

    const res = await request(app).get('/api/expenses/total');
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(40);
    expect(res.body.byCategory).toEqual({ Travel: 20, Food: 20 });
  });
});

describe('DELETE /api/expenses/:id', () => {
  it('deletes an existing expense', async () => {
    const createRes = await request(app).post('/api/expenses').send({
      title: 'Movie ticket',
      amount: 300,
      category: 'Entertainment',
      date: '2026-07-01',
    });
    const { id } = createRes.body;

    const deleteRes = await request(app).delete(`/api/expenses/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.expense.id).toBe(id);

    const listRes = await request(app).get('/api/expenses');
    expect(listRes.body.count).toBe(0);
  });

  it('returns 404 when deleting a non-existent expense', async () => {
    const res = await request(app).delete('/api/expenses/non-existent-id');
    expect(res.status).toBe(404);
  });
});

describe('Unknown routes', () => {
  it('returns 404 for an undefined route', async () => {
    const res = await request(app).get('/api/does-not-exist');
    expect(res.status).toBe(404);
  });
});
