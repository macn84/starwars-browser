import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { CATEGORY_LABELS } from '../../types/swapi';

const defaultProps = {
  activeCategory: 'people' as const,
  onCategoryChange: jest.fn(),
};

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Star Wars Explorer title', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText(/star wars explorer/i)).toBeInTheDocument();
  });

  it('renders all 6 category tab buttons', () => {
    render(<Header {...defaultProps} />);
    Object.values(CATEGORY_LABELS).forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });
  });

  it('marks the active category button with aria-current="page"', () => {
    render(<Header {...defaultProps} activeCategory="planets" />);
    expect(screen.getByRole('button', { name: 'Planets' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('does not mark inactive buttons as current', () => {
    render(<Header {...defaultProps} activeCategory="people" />);
    expect(screen.getByRole('button', { name: 'Planets' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('calls onCategoryChange when a tab is clicked', async () => {
    const user = userEvent.setup();
    const onCategoryChange = jest.fn();
    render(<Header {...defaultProps} onCategoryChange={onCategoryChange} />);

    await user.click(screen.getByRole('button', { name: 'Films' }));
    expect(onCategoryChange).toHaveBeenCalledWith('films');
  });
});
