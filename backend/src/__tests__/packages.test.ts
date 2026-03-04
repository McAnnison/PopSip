import request from 'supertest';
import express from 'express';

// Mock the database pool before importing routes
const mockQuery = jest.fn();
jest.mock('../config/database', () => ({
  __esModule: true,
  default: { query: mockQuery },
}));

// Mock rate limiter middleware to pass through
jest.mock('../middleware/rateLimiter', () => ({
  apiLimiter: (_req: any, _res: any, next: any) => next(),
  writeLimiter: (_req: any, _res: any, next: any) => next(),
}));

import packageRoutes from '../routes/packages';

const app = express();
app.use(express.json());
app.use('/api/packages', packageRoutes);

describe('GET /api/packages', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns all packages', async () => {
    const packages = [{ id: 1, name: 'Basic', price: 50 }];
    mockQuery.mockResolvedValueOnce([packages]);

    const res = await request(app).get('/api/packages');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, data: packages });
  });

  it('returns 500 on database error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/packages');
    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ success: false });
  });
});

describe('GET /api/packages/:id', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns a package by ID', async () => {
    const pkg = { id: 1, name: 'Basic', price: 50 };
    mockQuery.mockResolvedValueOnce([[pkg]]);

    const res = await request(app).get('/api/packages/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, data: pkg });
  });

  it('returns 404 when package not found', async () => {
    mockQuery.mockResolvedValueOnce([[]]);

    const res = await request(app).get('/api/packages/999');
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ success: false, message: 'Package not found' });
  });

  it('returns 500 on database error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/packages/1');
    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ success: false });
  });
});

describe('POST /api/packages', () => {
  afterEach(() => jest.clearAllMocks());

  it('creates a new package', async () => {
    mockQuery.mockResolvedValueOnce([{ insertId: 42 }]);

    const res = await request(app).post('/api/packages').send({
      name: 'Premium',
      description: 'Premium package',
      price: 150,
      duration: 4,
    });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      success: true,
      message: 'Package created successfully',
      data: { id: 42 },
    });
  });

  it('returns 500 on database error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).post('/api/packages').send({
      name: 'Premium',
      price: 150,
    });
    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ success: false });
  });
});
