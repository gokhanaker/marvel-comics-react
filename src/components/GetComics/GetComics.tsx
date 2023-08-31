import { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';

interface prop {
  heroId: number;
}

interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  prices: {
    type: string;
    price: number;
  }[];
}

class GetComics extends Component<prop> {
  readonly publicKey: string;
  readonly privateKey: string;
  readonly ts: number;
  readonly hash: string;

  state = {
    comicList: [],
  };

  constructor(props: any) {
    super(props);
    this.publicKey = process.env.REACT_APP_PUBLIC_KEY || '';
    this.privateKey = process.env.REACT_APP_PRIVATE_KEY || '';
    this.ts = new Date().getTime();
    this.hash = md5(this.ts + this.privateKey + this.publicKey);

    this.getComicList = this.getComicList.bind(this);
  }

  getComicList = async (heroId: number) => {
    const getComicListUrl = `http://gateway.marvel.com/v1/public/characters/${heroId}/comics?format=comic&ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    const jsonResponse = await axios.get(getComicListUrl);

    const comicList: Comic[] = jsonResponse.data.data.results;
    console.log('comicList', comicList);
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
