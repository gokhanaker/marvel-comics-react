import React from 'react';

interface Props {
  superHeroName: string;
  superHeroDescription: string;
  superHeroImage: string;
}

const info = ({
  superHeroName,
  superHeroDescription,
  superHeroImage,
}: Props) => {
  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <img src={superHeroImage} alt={superHeroName} />
            <span className="card-title">{superHeroName}</span>
          </div>
          <div className="card-content">
            <p>{superHeroDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default info;
