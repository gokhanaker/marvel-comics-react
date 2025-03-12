import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import GetCharacter from '../GetCharacter';

describe('GetCharacter component', () => {
  test('renders the component', () => {
    const { getByPlaceholderText } = render(<GetCharacter />);
    expect(getByPlaceholderText('Search Your Character')).toBeInTheDocument();
  });

  test('updateCharacterName method should call setState method with heroName', () => {
    const { getByPlaceholderText } = render(<GetCharacter />);
    const inputElement = getByPlaceholderText('Search Your Character');

    fireEvent.change(inputElement, { target: { value: 'wolverine' } });

    expect((inputElement as HTMLInputElement).value).toBe('wolverine');
  });

  test('handleKeyPress method should call getCharacterInfo method when enter key is pressed', () => {
    const getCharacter = new GetCharacter({});
    const mockGetCharacterInfo = jest.fn();
    getCharacter.getCharacterInfo = mockGetCharacterInfo;

    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    getCharacter.handleKeyPress(
      event as unknown as React.KeyboardEvent<HTMLInputElement>,
    );

    expect(mockGetCharacterInfo).toHaveBeenCalled();
  });
});
