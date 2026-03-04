import request from 'supertest';
import express from 'express';

const mockQuery = jest.fn();
jest.mock('../config/database', () => ({
  __esModule: true,
  default: { query: mockQuery },
}));

jest.mock('../middleware/rateLimiter', () => ({
  apiLimiter: (_req: any, _res: any, next: any) => next(),
  writeLimiter: (_req: any, _res: any, next: any) => next(),
}));

import bookingRoutes from '../routes/bookings';

const app = express();
app.use(express.json());
app.use('/api/bookings', bookingRoutes);

describe('GET /api/bookings', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns all bookings', async () => {
    const bookings = [{ id: 1, customer_name: 'Alice', status: 'pending' }];
    mockQuery.mockResolvedValueOnce([bookings]);

    const res = await request(app).get('/api/bookings');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, data: bookings });
  });

  it('returns 500 on database error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/bookings');
    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ success: false });
  });
});

describe('POST /api/bookings', () => {
  afterEach(() => jest.clearAllMocks());

  it('creates a new booking', async () => {
    mockQuery.mockResolvedValueOnce([{ insertId: 7 }]);

    const res = await request(app).post('/api/bookings').send({
      customer_name: 'Bob',
      customer_email: 'bob@example.com',
      package_id: 1,
      event_date: '2026-06-15',
    });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      success: true,
      message: 'Booking created successfully',
      data: { id: 7 },
    });
  });

  it('defaults status to "pending" when not provided', async () => {
    mockQuery.mockResolvedValueOnce([{ insertId: 8 }]);

    await request(app).post('/api/bookings').send({
      customer_name: 'Carol',
      customer_email: 'carol@example.com',
      package_id: 2,
      event_date: '2026-07-20',
    });

    // Verify the query was called with 'pending' as the status
    expect(mockQuery).toHaveBeenCalledWith(
      expect.any(String),
      expect.arrayContaining(['pending'])
    );
  });

  it('returns 500 on database error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).post('/api/bookings').send({
      customer_name: 'Dave',
      customer_email: 'dave@example.com',
    });
    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ success: false });
  });
});
