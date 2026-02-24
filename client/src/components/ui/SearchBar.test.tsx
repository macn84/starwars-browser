import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders an input element', () => {
    render(<SearchBar value="" onChange={() => undefined} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<SearchBar value="Luke" onChange={() => undefined} />);
    expect(screen.getByRole('searchbox')).toHaveValue('Luke');
  });

  it('calls onChange with the new value when user types', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);

    await user.type(screen.getByRole('searchbox'), 'L');
    expect(onChange).toHaveBeenCalledWith('L');
  });

  it('shows a clear button when there is a value', () => {
    render(<SearchBar value="Luke" onChange={() => undefined} />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('does not show a clear button when value is empty', () => {
    render(<SearchBar value="" onChange={() => undefined} />);
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('calls onChange with empty string when clear is clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<SearchBar value="Luke" onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('renders with a custom placeholder', () => {
    render(<SearchBar value="" onChange={() => undefined} placeholder="Find a Jedi..." />);
    expect(screen.getByPlaceholderText('Find a Jedi...')).toBeInTheDocument();
  });
});
