import { Component } from 'react';
import axios from 'axios';
import { Comic, GetComicsProps } from '../../types';
import { initializeApiCallSetup } from '../../utils';

class GetComics extends Component<GetComicsProps> {
  state = {
    comicList: [],
  };

  constructor(props: any) {
    super(props);
    this.getComicList = this.getComicList.bind(this);
  }

  getComicList = async (heroId: number) => {
    const { publicKey, ts, hash } = initializeApiCallSetup();
    const getComicListUrl = `http://gateway.marvel.com/v1/public/characters/${heroId}/comics?format=comic&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const jsonResponse = await axios.get(getComicListUrl);

    const comicList: Comic[] = jsonResponse.data.data.results;
    this.setState({ comicList: comicList });
  };

  componentDidMount(): void {
    const { heroId } = this.props;
    this.getComicList(heroId);
  }

  render() {
    const { comicList } = this.state;
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
                    maxWidth: '300px',
                    maxHeight: '300px',
                  }}
                />
              </div>
              <div className="card-content">
                <h6
                  style={{
                    maxWidth: '300px',
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
  }
}

export default GetComics;
