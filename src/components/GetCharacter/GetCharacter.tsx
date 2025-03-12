import { Component } from 'react';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import GetComics from '../GetComics/GetComics';
import M from 'materialize-css';
import { fetchCharacterInfo } from '../../services/apiService';

class GetCharacter extends Component {
  state = {
    heroId: null,
    heroName: null,
    heroDescription: null,
    heroImage: null,
  };

  updateCharacterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ heroName: event.target.value });
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.getCharacterInfo();
    }
  };

  getCharacterInfo = async () => {
    const { heroName } = this.state;
    if (!heroName) return;

    const res = await fetchCharacterInfo(heroName);

    if (
      !res.data.data ||
      !res.data.data.results ||
      res.data.data.results.length === 0
    )
      M.toast({
        html: 'No marvel character found with that name :(',
        classes: 'rounded',
      });
    else {
      const { id, name, description, thumbnail } = res.data.data.results[0];

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
        <div className="col s2 input-field offset-s5">
          <input
            placeholder="Search Your Character"
            id="heroName"
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
    );
  }
}

export default GetCharacter;
