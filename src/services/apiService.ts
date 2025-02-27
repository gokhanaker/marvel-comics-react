import axios from 'axios';
import { initializeApiCallSetup, marvelComicsAPIBaseUrl } from '../utils';

export const fetchCharacter = async (heroName: string) => {
  const { publicKey, ts, hash } = initializeApiCallSetup();
  const url = `${marvelComicsAPIBaseUrl}/characters?name=${heroName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  return axios.get(url).then((res) => res.data.data.results[0]);
};

export const fetchComics = async (heroId: number) => {
  const { publicKey, ts, hash } = initializeApiCallSetup();
  const url = `${marvelComicsAPIBaseUrl}/characters/${heroId}/comics?format=comic&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  return axios.get(url).then((res) => res.data.data.results);
};
