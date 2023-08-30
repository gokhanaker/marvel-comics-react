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
    heroId: null,
    heroName: null,
    heroDescription: null,
    heroImage: null,
    comicList: [],
  };

  updateCharacterName = (event: any) => {
    this.setState({ heroName: event.target.value });
  };

  handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.getCharacterInfo();
    }
  };

  getCharacterInfo = async () => {
    const { heroName } = this.state;
    const getCharacterInfoUrl = `http://gateway.marvel.com/v1/public/characters?name=${heroName}&ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    const jsonResponse = await axios.get(getCharacterInfoUrl);

    if (jsonResponse.data.data.results.length === 0) return;
    else {
      const { id, name, description, comics, thumbnail } =
        jsonResponse.data.data.results[0];

      this.setState({
        heroId: id,
        heroName: name,
        heroDescription: description,
        heroImage: thumbnail.path + '.' + thumbnail.extension,
      });
    }
  };

  componentDidUpdate(): void {
    if (this.state.heroId !== null) {
      this.getComicList();
    }
  }

  getComicList = async () => {
    const { heroId } = this.state;
    const getComicListUrl = `http://gateway.marvel.com/v1/public/characters/${heroId}/comics?format=comic&ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    const jsonResponse = await axios.get(getComicListUrl);

    const comicList = jsonResponse.data.data.results[0];
    this.setState({ comicList: comicList });
  };

  constructor(props: any) {
    super(props);
    this.updateCharacterName = this.updateCharacterName.bind(this);
    this.getCharacterInfo = this.getCharacterInfo.bind(this);

    this.publicKey = process.env.REACT_APP_PUBLIC_KEY || '';
    this.privateKey = process.env.REACT_APP_PRIVATE_KEY || '';
    this.ts = new Date().getTime();
    this.hash = md5(this.ts + this.privateKey + this.publicKey);
  }

  render() {
    const { heroName, heroDescription, heroImage, comicList } = this.state;

    return (
      <div className="row">
        <div className="col s3"> </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              placeholder="Search Your Character"
              id="hero_name"
              type="text"
              className="validate"
              onChange={this.updateCharacterName}
              onKeyUpCapture={this.handleKeyPress}
            />
          </div>
          {heroName && heroDescription && heroImage && (
            <CharacterInfo
              heroName={heroName}
              heroDescription={heroDescription}
              heroImage={heroImage}
            ></CharacterInfo>
          )}
        </div>
        <div className="col s3"> </div>
      </div>
    );
  }
}

export default GetCharacter;
