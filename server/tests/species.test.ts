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

const mockSpecies = {
  name: 'Human',
  classification: 'mammal',
  designation: 'sentient',
  average_height: '180',
  skin_colors: 'caucasian, black, asian, hispanic',
  hair_colors: 'blonde, brown, black, red',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  average_lifespan: '120',
  homeworld: 'https://swapi.dev/api/planets/9/',
  language: 'Galactic Basic',
  people: [],
  films: [],
  created: '2014-12-10T13:52:11.567000Z',
  edited: '2014-12-20T21:36:42.136000Z',
  url: 'https://swapi.dev/api/species/1/',
};

const mockListResponse = { count: 37, next: null, previous: null, results: [mockSpecies] };

describe('GET /api/species', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with species list', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    const res = await request(app).get('/api/species');
    expect(res.status).toBe(200);
    expect(res.body.results[0].name).toBe('Human');
  });

  it('passes search param', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    await request(app).get('/api/species?search=human');
    expect(mockFetchList).toHaveBeenCalledWith('species', 'human', undefined);
  });

  it('returns 500 on error', async () => {
    mockFetchList.mockRejectedValue(new SwapiError('Error', 500));
    const res = await request(app).get('/api/species');
    expect(res.status).toBe(500);
  });
});

describe('GET /api/species/:id', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with species data', async () => {
    mockFetchById.mockResolvedValue(mockSpecies);
    const res = await request(app).get('/api/species/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Human');
  });

  it('returns 404 when not found', async () => {
    mockFetchById.mockRejectedValue(new SwapiError('Not found', 404));
    const res = await request(app).get('/api/species/999');
    expect(res.status).toBe(404);
  });
});
