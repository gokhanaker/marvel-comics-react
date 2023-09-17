import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import GetCharacter from '../GetCharacter';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { emptyMarvelApiCharacterInfoResponse } from '../../../utils/test-helpers';

jest.mock('../../../utils', () => ({
  initializeApiCallSetup: jest.fn().mockReturnValue({
    publicKey: 'apiKeyTest',
    ts: '123',
    hash: 'hashTest',
  }),
  marvelComicsAPIBaseUrl: 'https://gateway.marvel.com/v1/public',
}));

describe('GetCharacter component', () => {
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

  describe('getCharacterInfo method with Marvel Comics API call', () => {
    const mockAxios = new MockAdapter(axios);

    afterEach(() => {
      mockAxios.reset();
    });

    test('displaying the toast message to user when no character is found', async () => {
      const getCharacter = new GetCharacter({});

      mockAxios
        .onGet(
          'https://gateway.marvel.com/v1/public/characters?name=null&ts=123&apikey=apiKeyTest&hash=hashTest',
        )
        .reply(200, emptyMarvelApiCharacterInfoResponse);

      await getCharacter.getCharacterInfo();

      const toast = document.querySelector('.toast');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveTextContent(
        'No marvel character found with that name :(',
      );
    });
  });
});
