import { CharacterInfoProps } from '../../types';
import './CharacterInfo.scss';

const CharacterInfo = ({
  heroName,
  heroDescription,
  heroImage,
}: CharacterInfoProps) => {
  const isMobileScreen = window.innerWidth < 768;
  return (
    <div className="row">
      <div
        className={`col s4 card hoverable offset-s4 ${
          isMobileScreen ? 'medium' : ''
        } `}
      >
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
