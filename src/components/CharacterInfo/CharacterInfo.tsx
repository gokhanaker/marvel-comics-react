import { CharacterInfoProps } from '../../types';

const info = ({ heroName, heroDescription, heroImage }: CharacterInfoProps) => {
  return (
    <div className="row">
      <div className="col s3"> </div>
      <div className="col s6">
        <div className="card">
          <div className="card-image">
            <img src={heroImage} alt={heroName} />
            <span className="card-title">{heroName}</span>
          </div>
          <div className="card-content">
            <p>{heroDescription}</p>
          </div>
        </div>
      </div>
      <div className="col s3"> </div>
    </div>
  );
};

export default info;
