import { Comic, ComicListInfoProps } from '../../types';
import './ComicListInfo.scss';

const maxLength = 40;
const truncateText = (text: string, limit = maxLength) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const ComicListInfo = ({ comicList }: ComicListInfoProps) => {
  return (
    <div className="row">
      {comicList.map((comic: Comic) => (
        <div
          className="card hoverable small col s3 center-align"
          key={comic.id}
        >
          <div className="card-image">
            <img
              className="comic-image"
              src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
              alt={comic.title}
            />
          </div>
          <div className="card-content">
            <h6 className="comic-title">{truncateText(comic.title)}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComicListInfo;
