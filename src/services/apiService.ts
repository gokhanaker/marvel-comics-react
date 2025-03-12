import axios from 'axios';
import { initializeApiCallSetup, marvelComicsAPIBaseUrl } from '../utils';
import { Comic } from '../types';

export const fetchCharacterInfo = async (heroName: string) => {
  const { publicKey, ts, hash } = initializeApiCallSetup();
  const url = `${marvelComicsAPIBaseUrl}/characters?name=${heroName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  return await axios.get(url);
};

export const fetchComics = async (heroId: number) => {
  const { publicKey, ts, hash } = initializeApiCallSetup();
  const url = `${marvelComicsAPIBaseUrl}/characters/${heroId}/comics?format=comic&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  const response = await axios.get(url);
  return response.data.data.results.filter(
    (comic: Comic) =>
      comic.thumbnail.path !==
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
  );
};
