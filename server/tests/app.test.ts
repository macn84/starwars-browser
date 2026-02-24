import request from 'supertest';
import { app } from '../src/app';

describe('Express App', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).toBe(404);
  });

  it('has CORS headers on API responses', async () => {
    const res = await request(app).get('/api/people');
    // CORS header should be present (value may vary by origin setting)
    expect(res.headers).toHaveProperty('access-control-allow-origin');
  });
});
