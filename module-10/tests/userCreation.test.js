import request from 'supertest';
import app from '../src/app.js';
import db from '../src/Config/db.js';

jest.mock('../src/Config/db', () => ({
  query: jest.fn(() => Promise.resolve([[{ result: 1 }]])),
  getConnection: jest.fn(() => Promise.resolve({
    beginTransaction: jest.fn(),
    query: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn(),
    release: jest.fn(),
  }))
}));

describe('POST /create', () => {
  it('should return 500 if username exists', async () => {
    db.query.mockResolvedValueOnce([[{ username: 'existingUser' }]]);

    const res = await request(app).post('/api/create').send({
      username: 'existingUser',
      email: 'test@example.com',
      password: '123',
      refferalCode: 'abc123'
    });
    // console.log("4: ", res);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('username already exist');
  });

  it('should return 500 if email exists', async () => {
    db.query.mockResolvedValueOnce([[]]);
    db.query.mockResolvedValueOnce([[{ email: 'test@example.com' }]]);


    const res = await request(app).post('/api/create').send({
      username: 'newuser',
      email: 'test@example.com',
      password: '123',
      refferalCode: 'abc123'
    });
    // console.log("2:", res);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('email already exist');
  });

  it('should create a new user', async () => {
    const connection = await db.getConnection();

    db.query.mockResolvedValueOnce([[]]);
    db.query.mockResolvedValueOnce([[]]);
    connection.query.mockResolvedValueOnce();
    connection.query.mockResolvedValueOnce();
    connection.query.mockResolvedValueOnce([[{ username: 'refferedByUser' }], []]);
    connection.query.mockResolvedValueOnce();

    const res = await request(app).post('/api/create').send({
      username: 'sudip',
      email: 'new2@example.com',
      password: '123',
      refferalCode: 'dfgvhbjk'
    });

    // console.log("res.status:", res.status);
    // console.log("res.body:", res.body);


    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User Created Sucessfuly');
  });

});
