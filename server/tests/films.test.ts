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

const mockFilm = {
  title: 'A New Hope',
  episode_id: 4,
  opening_crawl: 'It is a period of civil war...',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
  characters: [],
  planets: [],
  starships: [],
  vehicles: [],
  species: [],
  created: '2014-12-10T14:23:31.880000Z',
  edited: '2014-12-20T19:49:45.256000Z',
  url: 'https://swapi.dev/api/films/1/',
};

const mockListResponse = { count: 6, next: null, previous: null, results: [mockFilm] };

describe('GET /api/films', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with film list', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    const res = await request(app).get('/api/films');
    expect(res.status).toBe(200);
    expect(res.body.results[0].title).toBe('A New Hope');
  });

  it('passes search param', async () => {
    mockFetchList.mockResolvedValue(mockListResponse);
    await request(app).get('/api/films?search=hope');
    expect(mockFetchList).toHaveBeenCalledWith('films', 'hope', undefined);
  });

  it('returns 500 on error', async () => {
    mockFetchList.mockRejectedValue(new SwapiError('Error', 500));
    const res = await request(app).get('/api/films');
    expect(res.status).toBe(500);
  });
});

describe('GET /api/films/:id', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with film data', async () => {
    mockFetchById.mockResolvedValue(mockFilm);
    const res = await request(app).get('/api/films/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('A New Hope');
  });

  it('returns 404 when not found', async () => {
    mockFetchById.mockRejectedValue(new SwapiError('Not found', 404));
    const res = await request(app).get('/api/films/999');
    expect(res.status).toBe(404);
  });
});
