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

const mockStarship = {
  name: 'Death Star',
  model: 'DS-1 Orbital Battle Station',
  manufacturer: 'Imperial Department of Military Research',
  cost_in_credits: '1000000000000',
  length: '120000',
  max_atmosphering_speed: 'n/a',
  crew: '342953',
  passengers: '843342',
  cargo_capacity: '1000000000000',
  consumables: '3 years',
  hyperdrive_rating: '4.0',
  MGLT: '10',
  starship_class: 'Deep Space Mobile Battlestation',
  pilots: [],
  films: [],
  created: '2014-12-10T16:36:50.509000Z',
  edited: '2014-12-20T21:26:24.783000Z',
  url: 'https://swapi.dev/api/starships/9/',
};

const mockListResponse = { count: 36, next: null, previous: null, results: [mockStarship] };

describe('GET /api/starships', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with starship list', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    const res = await request(app).get('/api/starships');
    expect(res.status).toBe(200);
    expect(res.body.results[0].name).toBe('Death Star');
  });

  it('passes search param', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    await request(app).get('/api/starships?search=death');
    expect(mockFetchList).toHaveBeenCalledWith('starships', 'death', undefined);
  });

  it('returns 500 on error', async () => {
    mockFetchList.mockRejectedValue(new SwapiError('Error', 500));
    const res = await request(app).get('/api/starships');
    expect(res.status).toBe(500);
  });
});

describe('GET /api/starships/:id', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with starship data', async () => {
    mockFetchById.mockResolvedValue(mockStarship);
    const res = await request(app).get('/api/starships/9');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Death Star');
  });

  it('returns 404 when not found', async () => {
    mockFetchById.mockRejectedValue(new SwapiError('Not found', 404));
    const res = await request(app).get('/api/starships/999');
    expect(res.status).toBe(404);
  });
});
