export const mockEventToSearchCharacter = {
  target: {
    value: 'marvelHero',
  },
};

export const emptyMarvelApiCharacterInfoResponse = {
  data: {
    results: [],
  },
};

export const marvelApiCharacterInfoResponse = {
  data: {
    results: [
      {
        id: 123,
        name: 'wolverine',
        description: 'wolverine description',
        comics: {},
        thumbnail: {
          path: 'path',
          extension: 'jpg',
        },
      },
    ],
  },
};

export const mockCharacterInfoProps = {
  heroName: 'wolverine',
  heroImage: 'wolverine image',
  heroDescription: 'wolverine description',
};

export const mockComicListInfoProps = {
  comicList: [
    {
      id: 123,
      title: 'wolverine with x-men marvel comic 2020 #1 cover title',
      description: 'wolverine description',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
    },
  ],
};
