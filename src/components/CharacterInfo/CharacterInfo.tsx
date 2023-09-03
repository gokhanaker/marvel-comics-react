import { CharacterInfoProps } from '../../types';

const CharacterInfo = ({
  heroName,
  heroDescription,
  heroImage,
}: CharacterInfoProps) => {
  return (
    <div className="row">
      <div className="col s4 card offset-s4">
        <div className="card-image">
          <img src={heroImage} alt={heroName} />
          <span className="card-title">{heroName}</span>
        </div>
        <div className="card-content">
          <p>{heroDescription}</p>
        </div>
        <div className="card-action">
          <a>Comic List is below </a>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
