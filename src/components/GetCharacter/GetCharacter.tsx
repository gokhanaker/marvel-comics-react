import { Component } from 'react';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import GetComics from '../GetComics/GetComics';
import { fetchCharacterInfo } from '../../services/apiService';
import { showToast } from '../../utils';
import { GetCharacterState } from '../../types';

class GetCharacter extends Component<{}, GetCharacterState> {
  state: GetCharacterState = {
    heroId: null,
    heroName: null,
    heroDescription: null,
    heroImage: null,
    isLoading: false,
    error: null,
  };

  updateCharacterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ heroName: event.target.value, error: null });
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.getCharacterInfo();
    }
  };

  getCharacterInfo = async () => {
    const { heroName } = this.state;
    if (!heroName) {
      this.setState({ error: 'Please enter a character name' });
      return;
    }

    this.setState({ isLoading: true, error: null });

    try {
      const res = await fetchCharacterInfo(heroName);

      if (!res.data.data?.results?.length) {
        showToast('No marvel character found with that name :(', 'rounded');
        this.setState({
          error: 'No marvel character found with that name :(',
          isLoading: false,
        });
        return;
      }

      const { id, name, description, thumbnail } = res.data.data.results[0];

      this.setState({
        heroId: id,
        heroName: name,
        heroDescription: description,
        heroImage: thumbnail.path + '.' + thumbnail.extension,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        error: 'Failed to fetch character information. Please try again.',
        isLoading: false,
      });
      showToast(
        'Failed to fetch character information. Please try again.',
        'rounded',
      );
    }
  };

  render() {
    const { heroName, heroDescription, heroImage, heroId, isLoading, error } =
      this.state;

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
            disabled={isLoading}
          />
          {error && <div className="red-text text-darken-2">{error}</div>}
        </div>
        {isLoading && <div>Loading character...</div>}
        {!isLoading && heroName && heroDescription && heroImage && (
          <CharacterInfo
            heroName={heroName}
            heroDescription={heroDescription}
            heroImage={heroImage}
          />
        )}
        {!isLoading && heroId && <GetComics heroId={heroId} />}
      </div>
    );
  }
}

export default GetCharacter;
