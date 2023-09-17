import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import GetCharacter from '../GetCharacter';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  emptyMarvelApiCharacterInfoResponse,
  marvelApiCharacterInfoResponse,
} from '../../../utils/test-helpers';

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
    const mockSetState = jest.fn();
    getCharacter.setState = mockSetState;

    getCharacter.updateCharacterName({ target: { value: 'wolverine' } });
    expect(mockSetState).toHaveBeenCalledWith({ heroName: 'wolverine' });
  });

  test('handleKeyPress method should call getCharacterInfo method when enter key is pressed', () => {
    const getCharacter = new GetCharacter({});
    const mockGetCharacterInfo = jest.fn();
    getCharacter.getCharacterInfo = mockGetCharacterInfo;

    getCharacter.handleKeyPress({ key: 'Enter' });
    expect(mockGetCharacterInfo).toHaveBeenCalled();
  });

  describe('getCharacterInfo method with Marvel Comics API call', () => {
    const mockAxios = new MockAdapter(axios);

    afterEach(() => {
      mockAxios.reset();
    });

    test('displaying the toast message to user when no character is found at marvel api', async () => {
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
    test('updating component state when marvel character is found at marvel api', async () => {
      const getCharacter = new GetCharacter({});
      const mockSetState = jest.fn();
      getCharacter.setState = mockSetState;

      mockAxios
        .onGet(
          'https://gateway.marvel.com/v1/public/characters?name=null&ts=123&apikey=apiKeyTest&hash=hashTest',
        )
        .reply(200, marvelApiCharacterInfoResponse);

      await getCharacter.getCharacterInfo();
      expect(mockSetState).toHaveBeenCalledWith({
        heroId: marvelApiCharacterInfoResponse.data.results[0].id,
        heroName: marvelApiCharacterInfoResponse.data.results[0].name,
        heroDescription:
          marvelApiCharacterInfoResponse.data.results[0].description,
        heroImage:
          marvelApiCharacterInfoResponse.data.results[0].thumbnail.path +
          '.' +
          marvelApiCharacterInfoResponse.data.results[0].thumbnail.extension,
      });
    });
  });
});
