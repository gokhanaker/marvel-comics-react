import { Comic, ComicListInfoProps } from '../../types';

const maxLength = 40;
const truncateText = (text: string, limit = maxLength) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const ComicListInfo = ({ comicList }: ComicListInfoProps) => {
  return (
    <div className="row">
      {comicList.map((comic: Comic) => (
        <div className="card col s3" key={comic.id}>
          <div className="card-image">
            <img
              src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
              alt={comic.title}
              style={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '300px',
                maxHeight: '300px',
              }}
            />
          </div>
          <div className="card-content">
            <h6
              className="text-center"
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                margin: '0',
                fontSize: '12px',
              }}
            >
              {truncateText(comic.title)}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComicListInfo;
