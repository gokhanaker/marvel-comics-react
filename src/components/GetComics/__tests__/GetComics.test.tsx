import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import GetComics from '../GetComics';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { mockMarvelApiComicListResponse } from '../../../utils/test-helpers';

jest.mock('../../../utils', () => ({
  initializeApiCallSetup: jest.fn().mockReturnValue({
    publicKey: 'apiKeyTest',
    ts: '123',
    hash: 'hashTest',
  }),
  marvelComicsAPIBaseUrl: 'https://gateway.marvel.com/v1/public',
}));

describe('GetComics component', () => {
  const mockHeroId = 10000;
  test('renders the component', () => {
    const getComics = render(<GetComics heroId={mockHeroId} />);
    expect(getComics).toBeTruthy();
  });

  test('componentDidMount method should call getComicList method', () => {
    const getComics = new GetComics({ heroId: mockHeroId });
    const mockGetComicList = jest.fn();
    getComics.getComicList = mockGetComicList;

    getComics.componentDidMount();
    expect(mockGetComicList).toHaveBeenCalledWith(mockHeroId);
  });

  test('displaying the toast message when no marvel comic is found at marvel api', async () => {
    const getComics = new GetComics({ heroId: mockHeroId });

    const mockAxios = new MockAdapter(axios);
    mockAxios
      .onGet(
        'https://gateway.marvel.com/v1/public/characters/10000/comics?format=comic&ts=123&apikey=apiKeyTest&hash=hashTest',
      )
      .reply(200, {
        data: {
          results: [],
        },
      });

    await getComics.getComicList(mockHeroId);

    const toast = document.querySelector('.toast');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent('No marvel comics found :(');
  });

  test('updating component state when marvel comics is found at marvel api', async () => {
    const getComics = new GetComics({ heroId: mockHeroId });
    const mockSetState = jest.fn();
    getComics.setState = mockSetState;

    const mockAxios = new MockAdapter(axios);
    mockAxios
      .onGet(
        'https://gateway.marvel.com/v1/public/characters/10000/comics?format=comic&ts=123&apikey=apiKeyTest&hash=hashTest',
      )
      .reply(200, mockMarvelApiComicListResponse);

    await getComics.getComicList(mockHeroId);
    expect(mockSetState).toHaveBeenCalledWith({
      comicList: [
        {
          id: mockMarvelApiComicListResponse.data.results[0].id,
          title: mockMarvelApiComicListResponse.data.results[0].title,
          thumbnail: {
            path: mockMarvelApiComicListResponse.data.results[0].thumbnail.path,
          },
        },
      ],
    });
  });
});
