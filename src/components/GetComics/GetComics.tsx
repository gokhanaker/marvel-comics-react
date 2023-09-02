import { Component, Fragment } from 'react';
import axios from 'axios';
import { Comic, GetComicsProps } from '../../types';
import { initializeApiCallSetup } from '../../utils';
import ComicListInfo from '../ComicListInfo/ComicListinfo';

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
      <Fragment>
        <ComicListInfo comicList={comicList} />
      </Fragment>
    );
  }
}

export default GetComics;
