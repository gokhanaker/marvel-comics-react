import axios from 'axios';
import { Component } from 'react';
import md5 from 'md5';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import ComicsInfo from '../ComicsInfo/ComicsInfo';

class GetCharacter extends Component {
  readonly publicKey: string;
  readonly privateKey: string;
  readonly ts: number;
  readonly hash: string;

  state = {
    superHeroId: null,
    superHeroName: null,
    superHeroDescription: null,
    superHeroImage: null,
    superHeroComics: [],
  };

  updateSuperHeroName = (event: any) => {
    this.setState({ superHeroName: event.target.value });
  };

  handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.getSuperHeroInfo();
    }
  };

  getSuperHeroInfo = async () => {
    const { superHeroName } = this.state;
    const getCharacterInfoUrl = `http://gateway.marvel.com/v1/public/characters?name=${superHeroName}&ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    const jsonResponse = await axios.get(getCharacterInfoUrl);

    if (jsonResponse.data.data.results.length === 0) return;
    else {
      const { id, name, description, comics, thumbnail } =
        jsonResponse.data.data.results[0];

      this.setState({
        superHeroId: id,
        superHeroName: name,
        superHeroDescription: description,
        superHeroImage: thumbnail.path + '.' + thumbnail.extension,
      });
    }
  };

  componentDidUpdate(): void {
    if (this.state.superHeroId !== null) {
      this.getSuperHeroComicList();
    }
  }

  getSuperHeroComicList = async () => {
    const { superHeroId } = this.state;
    const getComicListUrl = `http://gateway.marvel.com/v1/public/characters/${superHeroId}/comics?format=comic&ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    const jsonResponse = await axios.get(getComicListUrl);

    const comicList = jsonResponse.data.data.results[0];
    this.setState({ superHeroComics: comicList });
  };

  constructor(props: any) {
    super(props);
    this.updateSuperHeroName = this.updateSuperHeroName.bind(this);
    this.getSuperHeroInfo = this.getSuperHeroInfo.bind(this);

    this.publicKey = process.env.REACT_APP_PUBLIC_KEY || '';
    this.privateKey = process.env.REACT_APP_PRIVATE_KEY || '';
    this.ts = new Date().getTime();
    this.hash = md5(this.ts + this.privateKey + this.publicKey);
  }

  render() {
    const {
      superHeroName,
      superHeroDescription,
      superHeroImage,
      superHeroComics,
    } = this.state;

    return (
      <div className="row">
        <div className="col s3"> </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              placeholder="Search Your Character"
              id="superhero_name"
              type="text"
              className="validate"
              onChange={this.updateSuperHeroName}
              onKeyUpCapture={this.handleKeyPress}
            />
          </div>
          {superHeroName && superHeroDescription && superHeroImage && (
            <CharacterInfo
              superHeroName={superHeroName}
              superHeroDescription={superHeroDescription}
              superHeroImage={superHeroImage}
            ></CharacterInfo>
          )}
          {superHeroComics && <ComicsInfo comicList={superHeroComics} />}
        </div>
        <div className="col s3"> </div>
      </div>
    );
  }
}

export default GetCharacter;
