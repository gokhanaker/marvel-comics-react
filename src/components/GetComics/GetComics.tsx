import { Component, Fragment } from 'react';
import { GetComicsProps } from '../../types';
import M from 'materialize-css';
import { fetchComics } from '../../services/apiService';
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
    const comicList = await fetchComics(heroId);

    if (comicList.length === 0)
      return M.toast({
        html: 'No marvel comics found :(',
        classes: 'rounded toast',
      });

    this.setState({ comicList });
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
