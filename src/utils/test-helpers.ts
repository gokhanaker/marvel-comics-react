export const mockEventToSearchCharacter = {
  target: {
    value: 'marvelHero',
  },
};

export const emptyMarvelApiCharacterInfoResponse = {
  data: {
    data: {
      results: [],
    },
  },
};

export const marvelApiCharacterInfoResponse = {
  data: {
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
  },
};

export const mockCharacterInfoProps = {
  heroName: 'wolverine',
  heroImage: 'wolverine image',
  heroDescription: 'wolverine description',
};
