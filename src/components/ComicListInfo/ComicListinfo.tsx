import { Comic, ComicListInfoProps } from '../../types';

const ComicListInfo = ({ comicList }: ComicListInfoProps) => {
  return (
    <div className="row">
      {comicList.map((comic: Comic) => (
        <div>
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
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'nowrap',
                  margin: '0',
                  fontSize: '12px',
                }}
              >
                {comic.title}
              </h6>
            </div>
          </div>
          <div className="col s1"></div>
        </div>
      ))}
    </div>
  );
};

export default ComicListInfo;
