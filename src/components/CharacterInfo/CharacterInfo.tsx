import React from 'react';

interface Props {
  heroName: string;
  heroDescription: string;
  heroImage: string;
}

const info = ({ heroName, heroDescription, heroImage }: Props) => {
  return (
    <div className="row">
      <div className="col s12 m7">
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
    </div>
  );
};

export default info;
