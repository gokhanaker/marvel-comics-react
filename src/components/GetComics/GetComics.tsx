import { Component, Fragment } from 'react';
import axios from 'axios';
import { Comic, GetComicsProps } from '../../types';
import { initializeApiCallSetup, marvelComicsAPIBaseUrl } from '../../utils';
import ComicListInfo from '../ComicListInfo/ComicListInfo';
import M from 'materialize-css';

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
    const getComicListUrl = `${marvelComicsAPIBaseUrl}/characters/${heroId}/comics?format=comic&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const jsonResponse = await axios.get(getComicListUrl);

    const comicList: Comic[] = jsonResponse.data.data.results;

    const filteredComicList = comicList.filter((comic: Comic) => {
      return (
        comic.thumbnail.path !==
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
      );
    });

    if (filteredComicList.length === 0)
      return M.toast({
        html: 'No marvel comics found :(',
        classes: 'rounded toast',
      });

    this.setState({ comicList: filteredComicList });
  };

  componentDidMount(): void {
    const { heroId } = this.props;
    this.getComicList(heroId);
  }

  render() {
    const { comicList } = this.state;
    return (
      <Fragment>
        <ComicListInfo comicList={comicList} />
      </Fragment>
    );
  }
}

export default GetComics;
