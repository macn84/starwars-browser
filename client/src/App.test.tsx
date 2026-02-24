import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as swapiApi from './api/swapiApi';

jest.mock('./api/swapiApi');

const mockGetList = swapiApi.getList as jest.MockedFunction<typeof swapiApi.getList>;
const mockGetById = swapiApi.getById as jest.MockedFunction<typeof swapiApi.getById>;

const mockPeopleResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
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
      created: '',
      edited: '',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();
  mockGetList.mockResolvedValue(mockPeopleResponse);
  mockGetById.mockResolvedValue(mockPeopleResponse.results[0]);
});

describe('App', () => {
  it('renders the Star Wars Explorer header', () => {
    render(<App />);
    expect(screen.getByText(/star wars explorer/i)).toBeInTheDocument();
  });

  it('renders with the People tab active by default', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'People' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('loads and displays people cards', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('switches category when a tab is clicked', async () => {
    const user = userEvent.setup();
    mockGetList.mockResolvedValue({ count: 0, next: null, previous: null, results: [] });

    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Planets' }));

    expect(screen.getByRole('button', { name: 'Planets' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(mockGetList).toHaveBeenCalledWith('planets', '', 1);
  });

  it('opens detail modal when a card is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /view details/i }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes the modal when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /view details/i }));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: /close modal/i }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
