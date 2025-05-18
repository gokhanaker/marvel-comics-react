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

export interface ComicListInfoProps {
  comicList: Comic[];
}

export interface GetComicsState {
  comicList: Comic[];
  isLoading: boolean;
  error: string | null;
}

export interface GetCharacterState {
  heroId: number | null;
  heroName: string | null;
  heroDescription: string | null;
  heroImage: string | null;
  isLoading: boolean;
  error: string | null;
}
