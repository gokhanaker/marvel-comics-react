import md5 from 'md5';
import M from 'materialize-css';

export const MARVEL_COMICS_BASE_URL: string =
  'https://gateway.marvel.com/v1/public';

export const initializeApiCallSetup = () => {
  const publicKey: string = process.env.REACT_APP_PUBLIC_KEY || '';
  const privateKey: string = process.env.REACT_APP_PRIVATE_KEY || '';
  const ts: number = new Date().getTime();
  const hash: string = md5(ts + privateKey + publicKey);

  return {
    publicKey,
    ts,
    hash,
  };
};

export const showToast = (html: string, classes = 'rounded') => {
  M.toast({ html, classes });
};

export const truncateText = (text: string, limit = 40) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

export const getThumbnailUrl = (thumbnail: {
  path: string;
  extension: string;
}) => `${thumbnail.path}.${thumbnail.extension}`;
