import axios from 'axios';
import { Component } from 'react';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import GetComics from '../GetComics/GetComics';
import { initializeApiCallSetup } from '../../utils';

class GetCharacter extends Component {
  state = {
    heroId: null,
    heroName: null,
    heroDescription: null,
    heroImage: null,
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
    const { publicKey, ts, hash } = initializeApiCallSetup();
    const getCharacterInfoUrl = `http://gateway.marvel.com/v1/public/characters?name=${heroName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
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

  constructor(props: any) {
    super(props);
    this.updateCharacterName = this.updateCharacterName.bind(this);
    this.getCharacterInfo = this.getCharacterInfo.bind(this);
  }

  render() {
    const { heroName, heroDescription, heroImage, heroId } = this.state;

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
          {heroId && <GetComics heroId={heroId}></GetComics>}
        </div>
        <div className="col s3"> </div>
      </div>
    );
  }
}

export default GetCharacter;
