import './PokemonCard.css';
import React from 'react'

const PokemonCard = ({ id, image, name, type }) => {
const style = type + " pokemon-card";
  return (
    <div className={style}>
      <div className="pokemon-card-image-container">
        <img src={image} alt={name} />
      </div>
      <div className="pokemon-card-text-container">
        <div className="number"><h5>#0{id}</h5></div>
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard

