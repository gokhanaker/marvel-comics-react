import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import GetComics from '../GetComics';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { showToast } from '../../../utils';

jest.mock('../../../utils', () => ({
  initializeApiCallSetup: jest.fn().mockReturnValue({
    publicKey: 'apiKeyTest',
    ts: '123',
    hash: 'hashTest',
  }),
  MARVEL_COMICS_BASE_URL: 'https://gateway.marvel.com/v1/public',
  showToast: jest.fn(),
}));

describe('GetComics component', () => {
  const mockHeroId = 10000;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('renders the component with loading state', () => {
    render(<GetComics heroId={mockHeroId} />);
    expect(screen.getByText('Loading comics...')).toBeInTheDocument();
  });

  test('componentDidMount method should call getComicList method', () => {
    const getComics = new GetComics({ heroId: mockHeroId });
    const mockGetComicList = jest.fn();
    getComics.getComicList = mockGetComicList;

    getComics.componentDidMount();
    expect(mockGetComicList).toHaveBeenCalledWith(mockHeroId);
  });

  test('displaying error message when no marvel comic is found', async () => {
    mockAxios
      .onGet(
        `https://gateway.marvel.com/v1/public/characters/${mockHeroId}/comics?format=comic&ts=123&apikey=apiKeyTest&hash=hashTest`,
      )
      .reply(200, {
        data: {
          results: [],
        },
      });

    render(<GetComics heroId={mockHeroId} />);

    await waitFor(() => {
      expect(screen.getByText('No marvel comics found.')).toBeInTheDocument();
    });
    expect(showToast).toHaveBeenCalledWith(
      'No marvel comics found :(',
      'rounded toast',
    );
  });

  test('updates state when marvel comics are found', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            id: 123,
            title: 'Test Comic',
            description: 'Test Description',
            thumbnail: {
              path: 'test/path',
              extension: 'jpg',
            },
          },
        ],
      },
    };

    mockAxios
      .onGet(
        `https://gateway.marvel.com/v1/public/characters/${mockHeroId}/comics?format=comic&ts=123&apikey=apiKeyTest&hash=hashTest`,
      )
      .reply(200, mockResponse);

    render(<GetComics heroId={mockHeroId} />);

    expect(screen.getByText('Loading comics...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading comics...')).not.toBeInTheDocument();
    });
  });
});
