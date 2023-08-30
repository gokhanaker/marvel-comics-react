import React, { FC } from 'react';
import styles from './ComicsInfo.module.scss';

interface Comic {
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface Props {
  comicList: Comic[];
}

const ComicsInfo: React.FC<Props> = ({ comicList }) => {
  return (
    <div>
      <ul>
        {comicList.map((comic) => (
          <div className={styles.comicInfo}>
            <p>{comic.name}</p>
            <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ComicsInfo;
