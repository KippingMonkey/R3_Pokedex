import './PokemonCard.css';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { storeList, storeQuantity } from '../../Features/FavoritesData/FavoritesData.slice';
import { components } from '../../Constants';

const PokemonCard = ({ id, image, name, type, object }) => {

const style = type + " pokemon-card";
const pokemon = object;
const favorites = useSelector((state) => state.favoritesData);
const favoritesList = [...favorites.list];
const dispatch = useDispatch()

const handleClick = () => {
    if ( favoritesList.length === 0){
       favoritesList.push(pokemon);
       console.log("array", favoritesList.length)
       dispatch(storeList(favoritesList))
       dispatch(storeQuantity(favoritesList.length))
    }
    else{
      if (
        favoritesList.includes(pokemon)){
        const index = favoritesList.indexOf(pokemon);
        const updatedFavorites = favoritesList.splice(index, 1)
        dispatch(storeList(updatedFavorites))
        dispatch(storeQuantity(updatedFavorites.length))
      } 
      else{
        favoritesList.push(object);
        dispatch(storeList(favoritesList));
        dispatch(storeQuantity(favoritesList.length))
      }
    }

}
  return (
    <div className={style} onClick={handleClick}>
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

