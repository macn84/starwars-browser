import request from 'supertest';
import { app } from '../src/app';
import { SwapiError } from '../src/services/swapiClient';

jest.mock('../src/services/swapiClient', () => {
  const actual = jest.requireActual<typeof import('../src/services/swapiClient')>(
    '../src/services/swapiClient',
  );
  return { ...actual, fetchList: jest.fn(), fetchById: jest.fn() };
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { fetchList: mockFetchList, fetchById: mockFetchById } = require('../src/services/swapiClient') as {
  fetchList: jest.MockedFunction<typeof import('../src/services/swapiClient').fetchList>;
  fetchById: jest.MockedFunction<typeof import('../src/services/swapiClient').fetchById>;
};

const mockVehicle = {
  name: 'Sand Crawler',
  model: 'Digger Crawler',
  manufacturer: 'Corellia Mining Corporation',
  cost_in_credits: '150000',
  length: '36.8',
  max_atmosphering_speed: '30',
  crew: '46',
  passengers: '30',
  cargo_capacity: '50000',
  consumables: '2 months',
  vehicle_class: 'wheeled',
  pilots: [],
  films: [],
  created: '2014-12-10T15:36:25.724000Z',
  edited: '2014-12-20T21:30:21.661000Z',
  url: 'https://swapi.dev/api/vehicles/4/',
};

const mockListResponse = { count: 39, next: null, previous: null, results: [mockVehicle] };

describe('GET /api/vehicles', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with vehicle list', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    const res = await request(app).get('/api/vehicles');
    expect(res.status).toBe(200);
    expect(res.body.results[0].name).toBe('Sand Crawler');
  });

  it('passes search param', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    await request(app).get('/api/vehicles?search=sand');
    expect(mockFetchList).toHaveBeenCalledWith('vehicles', 'sand', undefined);
  });

  it('returns 500 on error', async () => {
    mockFetchList.mockRejectedValue(new SwapiError('Error', 500));
    const res = await request(app).get('/api/vehicles');
    expect(res.status).toBe(500);
  });
});

describe('GET /api/vehicles/:id', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with vehicle data', async () => {
    mockFetchById.mockResolvedValue(mockVehicle);
    const res = await request(app).get('/api/vehicles/4');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Sand Crawler');
  });

  it('returns 404 when not found', async () => {
    mockFetchById.mockRejectedValue(new SwapiError('Not found', 404));
    const res = await request(app).get('/api/vehicles/999');
    expect(res.status).toBe(404);
  });
});
