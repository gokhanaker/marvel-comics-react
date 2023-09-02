export interface CharacterInfoProps {
  heroName: string;
  heroDescription: string;
  heroImage: string;
}

export interface GetComicsProps {
  heroId: number;
}

export interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
