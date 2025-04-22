import axios from 'axios';
import { initializeApiCallSetup, MARVEL_COMICS_BASE_URL } from '../utils';
import { Comic } from '../types';

export const fetchCharacterInfo = async (heroName: string) => {
  const { publicKey, ts, hash } = initializeApiCallSetup();
  const url = `${MARVEL_COMICS_BASE_URL}/characters?name=${heroName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  return await axios.get(url);
};

export const fetchComics = async (heroId: number) => {
  const { publicKey, ts, hash } = initializeApiCallSetup();
  const url = `${MARVEL_COMICS_BASE_URL}/characters/${heroId}/comics?format=comic&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  const response = await axios.get(url);
  return response.data.data.results.filter(
    (comic: Comic) =>
      comic.thumbnail.path !==
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
  );
};
