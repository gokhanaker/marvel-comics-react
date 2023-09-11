import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import GetCharacter from '../GetCharacter';

describe('GetCharacter', () => {
  test('renders the component', () => {
    const { getByPlaceholderText } = render(<GetCharacter />);
    expect(getByPlaceholderText('Search Your Character')).toBeInTheDocument();
  });

  test('updateCharacterName method should call setState method with heroName', () => {
    const getCharacter = new GetCharacter({});
    const setStateMock = jest.fn();
    getCharacter.setState = setStateMock;

    getCharacter.updateCharacterName({ target: { value: 'wolverine' } });
    expect(setStateMock).toHaveBeenCalledWith({ heroName: 'wolverine' });
  });

  test('handleKeyPress method should call getCharacterInfo method when enter key is pressed', () => {
    const getCharacter = new GetCharacter({});
    const getCharacterInfoMock = jest.fn();
    getCharacter.getCharacterInfo = getCharacterInfoMock;

    getCharacter.handleKeyPress({ key: 'Enter' });
    expect(getCharacterInfoMock).toHaveBeenCalled();
  });
});
