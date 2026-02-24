import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

const defaultProps = {
  page: 1,
  hasNext: true,
  hasPrevious: false,
  totalCount: 82,
  onPageChange: jest.fn(),
};

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders page info', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/page 1 of 9/i)).toBeInTheDocument();
  });

  it('renders result count', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/82 results/i)).toBeInTheDocument();
  });

  it('disables the Prev button on page 1', () => {
    render(<Pagination {...defaultProps} hasPrevious={false} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables the Next button when there is no next page', () => {
    render(<Pagination {...defaultProps} hasNext={false} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('calls onPageChange with page + 1 when Next is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(<Pagination {...defaultProps} page={2} hasPrevious={true} onPageChange={onPageChange} />);

    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with page - 1 when Prev is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(<Pagination {...defaultProps} page={3} hasPrevious={true} onPageChange={onPageChange} />);

    await user.click(screen.getByRole('button', { name: /previous/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
