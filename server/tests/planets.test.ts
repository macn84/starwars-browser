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

const mockPlanet = {
  name: 'Tatooine',
  rotation_period: '23',
  orbital_period: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
  surface_water: '1',
  population: '200000',
  residents: [],
  films: [],
  created: '2014-12-09T13:50:49.641000Z',
  edited: '2014-12-20T20:58:18.411000Z',
  url: 'https://swapi.dev/api/planets/1/',
};

const mockListResponse = { count: 60, next: null, previous: null, results: [mockPlanet] };

describe('GET /api/planets', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with list data', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    const res = await request(app).get('/api/planets');
    expect(res.status).toBe(200);
    expect(res.body.results[0].name).toBe('Tatooine');
  });

  it('passes search and page params', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    await request(app).get('/api/planets?search=Tatooine&page=1');
    expect(mockFetchList).toHaveBeenCalledWith('planets', 'Tatooine', '1');
  });

  it('returns 500 on error', async () => {
    mockFetchList.mockRejectedValue(new SwapiError('Error', 500));
    const res = await request(app).get('/api/planets');
    expect(res.status).toBe(500);
  });
});

describe('GET /api/planets/:id', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with planet data', async () => {
    mockFetchById.mockResolvedValue(mockPlanet);
    const res = await request(app).get('/api/planets/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Tatooine');
  });

  it('returns 404 when not found', async () => {
    mockFetchById.mockRejectedValue(new SwapiError('Not found', 404));
    const res = await request(app).get('/api/planets/999');
    expect(res.status).toBe(404);
  });
});
