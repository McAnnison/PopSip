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

import bartenderRoutes from '../routes/bartenders';

const app = express();
app.use(express.json());
app.use('/api/bartenders', bartenderRoutes);

describe('GET /api/bartenders', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns list of bartenders', async () => {
    const bartenders = [{ id: 1, name: 'Alice', rating: 4.8 }];
    mockQuery.mockResolvedValueOnce([bartenders]);

    const res = await request(app).get('/api/bartenders');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ success: true, count: 1 });
  });

  it('returns 500 on database error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/bartenders');
    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ success: false });
  });
});

describe('GET /api/bartenders/:id', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns bartender details with services, reviews and portfolio', async () => {
    const bartender = { id: 1, name: 'Alice' };
    mockQuery
      .mockResolvedValueOnce([[bartender]])  // bartender
      .mockResolvedValueOnce([[]])            // services
      .mockResolvedValueOnce([[]])            // reviews
      .mockResolvedValueOnce([[]]);           // portfolio

    const res = await request(app).get('/api/bartenders/1');
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ id: 1, name: 'Alice', services: [], reviews: [], portfolio: [] });
  });

  it('returns 404 when bartender not found', async () => {
    mockQuery.mockResolvedValueOnce([[]]);

    const res = await request(app).get('/api/bartenders/999');
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ success: false, message: 'Bartender not found' });
  });

  it('returns 500 on database error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/bartenders/1');
    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ success: false });
  });
});

describe('POST /api/bartenders', () => {
  afterEach(() => jest.clearAllMocks());

  it('creates a new bartender profile', async () => {
    mockQuery.mockResolvedValueOnce([{ insertId: 5 }]);

    const res = await request(app).post('/api/bartenders').send({
      user_id: 10,
      business_name: 'Mix & Sip',
      bio: 'Expert mixologist',
      experience_years: 5,
      specialties: 'Craft Cocktails',
      hourly_rate: 75,
      phone: '555-1234',
      location: 'Austin, TX',
      service_radius: 30,
    });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      success: true,
      data: { id: 5 },
    });
  });
});

describe('PUT /api/bartenders/:id', () => {
  afterEach(() => jest.clearAllMocks());

  it('updates a bartender profile', async () => {
    mockQuery.mockResolvedValueOnce([{}]);

    const res = await request(app).put('/api/bartenders/1').send({
      bio: 'Updated bio',
      hourly_rate: 90,
    });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ success: true });
  });

  it('returns 400 when no valid fields provided', async () => {
    const res = await request(app).put('/api/bartenders/1').send({
      unknown_field: 'value',
    });
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ success: false, message: 'No valid fields to update' });
  });
});

describe('POST /api/bartenders/:id/publish', () => {
  afterEach(() => jest.clearAllMocks());

  it('publishes a bartender profile', async () => {
    mockQuery.mockResolvedValueOnce([{}]);

    const res = await request(app).post('/api/bartenders/1/publish');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ success: true, message: 'Bartender profile published successfully' });
  });
});
