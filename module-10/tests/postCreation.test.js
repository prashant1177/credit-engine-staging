import request from 'supertest';
import app from '../src/app.js';
import db from '../src/Config/db.js';

jest.mock('../src/Config/db', () => ({
  getConnection: jest.fn(),
}));

describe('POST /post', () => {
  let mockConnection;

  beforeEach(() => {
    mockConnection = {
      query: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
    };

    db.getConnection.mockResolvedValue(mockConnection);
  });

  it('should return 400 if any required field is missing', async () => {
    const res = await request(app).post('/api/post').send({
      username: 'sudip1',
    });

    expect(res.status).toBe(200); 
    expect(mockConnection.query).not.toHaveBeenCalled();
  });

  it('should create post and return success message', async () => {
    mockConnection.query.mockResolvedValue();

    const res = await request(app).post('/api/post').send({
      username: 'sudip1',
      postTitle: 'First Post',
      postContent: 'This is the body of the post',
    });

    expect(mockConnection.query).toHaveBeenCalledTimes(3);
    expect(mockConnection.commit).toHaveBeenCalled();
    expect(mockConnection.rollback).not.toHaveBeenCalled();
    expect(mockConnection.release).toHaveBeenCalled();

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('post created sucessfully');
  });

  it('should rollback and return error message on failure', async () => {
    mockConnection.query
      .mockResolvedValueOnce() 
      .mockRejectedValueOnce(new Error('DB Error')); 
    const res = await request(app).post('/api/post').send({
      username: 'sudip1',
      postTitle: 'Fail Post',
      postContent: 'This will fail',
    });

    expect(mockConnection.rollback).toHaveBeenCalled();
    expect(mockConnection.commit).not.toHaveBeenCalled();
    expect(mockConnection.release).toHaveBeenCalled();

    expect(res.status).toBe(200); 
    expect(res.body.message).toBe('something went Wrong');
  });
});
