import request from 'supertest';
import app from '../src/app.js';
import db from '../src/Config/db.js';

jest.mock('../src/Config/db');

describe('GET /user/:username', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 500 if user credit history not found', async () => {
    db.query.mockResolvedValueOnce([[]]);

    const res = await request(app).get('/api/user/testuser');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('user not exist');
  });

  it('should return 200 with credit history and total credit', async () => {
    const history = [
      { credit_point: 2, credit_action: 'signup', transaction_date: '2025-06-14' },
    ];
    const totalCredit = [{ credit_point: 12 }];

    db.query
      .mockResolvedValueOnce([history])
      .mockResolvedValueOnce([totalCredit]);

    const res = await request(app).get('/api/user/testuser');

    expect(res.status).toBe(200);
    expect(res.body.totalCredit).toBe(12);
    expect(res.body.history).toEqual(history);
  });
});
