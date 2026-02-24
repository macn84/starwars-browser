import request from 'supertest';
import { app } from '../src/app';
import { SwapiError } from '../src/services/swapiClient';

// Partial mock: keep SwapiError real so instanceof checks work in errorHandler
jest.mock('../src/services/swapiClient', () => {
  const actual = jest.requireActual<typeof import('../src/services/swapiClient')>(
    '../src/services/swapiClient',
  );
  return {
    ...actual,
    fetchList: jest.fn(),
    fetchById: jest.fn(),
  };
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { fetchList: mockFetchList, fetchById: mockFetchById } = require('../src/services/swapiClient') as {
  fetchList: jest.MockedFunction<typeof import('../src/services/swapiClient').fetchList>;
  fetchById: jest.MockedFunction<typeof import('../src/services/swapiClient').fetchById>;
};

const mockPerson = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

const mockListResponse = {
  count: 82,
  next: 'https://swapi.dev/api/people/?page=2',
  previous: null,
  results: [mockPerson],
};

describe('GET /api/people', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with list data on success', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    const res = await request(app).get('/api/people');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(82);
    expect(res.body.results).toHaveLength(1);
    expect(res.body.results[0].name).toBe('Luke Skywalker');
  });

  it('passes search query param to swapiClient', async () => {
    mockFetchList.mockResolvedValue({ ...mockListResponse, count: 1 });
    await request(app).get('/api/people?search=luke');
    expect(mockFetchList).toHaveBeenCalledWith('people', 'luke', undefined);
  });

  it('passes page query param to swapiClient', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    await request(app).get('/api/people?page=2');
    expect(mockFetchList).toHaveBeenCalledWith('people', undefined, '2');
  });

  it('returns 500 when swapiClient throws', async () => {
    mockFetchList.mockRejectedValue(new SwapiError('Network error', 500));
    const res = await request(app).get('/api/people');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
  });

  it('returns upstream status when SWAPI returns an error', async () => {
    mockFetchList.mockRejectedValue(new SwapiError('Not Found', 404));
    const res = await request(app).get('/api/people');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/people/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with single record on success', async () => {
    mockFetchById.mockResolvedValue(mockPerson);
    const res = await request(app).get('/api/people/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Luke Skywalker');
  });

  it('calls fetchById with correct resource and id', async () => {
    mockFetchById.mockResolvedValue(mockPerson);
    await request(app).get('/api/people/1');
    expect(mockFetchById).toHaveBeenCalledWith('people', '1');
  });

  it('returns 404 when person not found', async () => {
    mockFetchById.mockRejectedValue(new SwapiError('Not found', 404));
    const res = await request(app).get('/api/people/999');
    expect(res.status).toBe(404);
  });
});
