import { CharacterInfoProps } from '../../types';
import './CharacterInfo.scss';

const CharacterInfo = ({
  heroName,
  heroDescription,
  heroImage,
}: CharacterInfoProps) => {
  return (
    <div className="row">
      <div className="col s4 card hoverable medium offset-s4">
        <div className="card-image">
          <img src={heroImage} alt={heroName} />
        </div>
        <div className="card-content">
          <p>{heroDescription}</p>
        </div>
        <div className="card-action center-align">
          <a className="card-action-text">Comic List is below</a>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
