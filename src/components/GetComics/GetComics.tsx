import { Component, Fragment } from 'react';
import { GetComicsProps, Comic, GetComicsState } from '../../types';
import { fetchComics } from '../../services/apiService';
import ComicListInfo from '../ComicListInfo/ComicListInfo';
import { showToast } from '../../utils';

class GetComics extends Component<GetComicsProps, GetComicsState> {
  state: GetComicsState = {
    comicList: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    await this.getComicList(this.props.heroId);
  }

  async componentDidUpdate(prevProps: GetComicsProps) {
    if (prevProps.heroId !== this.props.heroId) {
      await this.getComicList(this.props.heroId);
    }
  }

  getComicList = async (heroId: number) => {
    this.setState({ isLoading: true, error: null });
    try {
      const comicList = await fetchComics(heroId);
      if (comicList.length === 0) {
        showToast('No marvel comics found :(', 'rounded toast');
        this.setState({
          comicList: [],
          isLoading: false,
          error: 'No marvel comics found.',
        });
        return;
      }
      this.setState({ comicList, isLoading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch comics.', isLoading: false });
      showToast('Failed to fetch comics.', 'rounded toast');
    }
  };

  render() {
    const { comicList, isLoading, error } = this.state;
    return (
      <Fragment>
        {isLoading && <div>Loading comics...</div>}
        {error && <div className="red-text">{error}</div>}
        <ComicListInfo comicList={comicList} />
      </Fragment>
    );
  }
}

export default GetComics;
