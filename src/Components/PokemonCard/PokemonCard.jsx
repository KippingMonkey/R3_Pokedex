import './PokemonCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { storeList, storeQuantity, storeSelected } from '../../Features/FavoritesData/FavoritesData.slice';
import * as Constants from '../../Constants';
import Btn from '../Button/Btn';

const PokemonCard = ({ id, image, name, type, object }) => {
  const style = type + " pokemon-card";
  const pokemon = object;
  const pokemonId = object.id;
  const favorites = useSelector((state) => state.favoritesData);
  const favoritesList = [...favorites.list];
  const selectedList = [...favorites.selected];
  const isSelected = selectedList.includes(pokemonId); 
  const dispatch = useDispatch();

  const handleClick = () => {
    if (favoritesList.length === 0) {
      favoritesList.push(pokemon);
      selectedList.push(pokemonId);
      dispatch(storeList(favoritesList));
      dispatch(storeQuantity(favoritesList.length));
      dispatch(storeSelected(selectedList));
    } else {
      if (favoritesList.includes(pokemon)) {
        const index = favoritesList.indexOf(pokemon);
        favoritesList.splice(index, 1);
        selectedList.splice(index, 1); 
        dispatch(storeList(favoritesList));
        dispatch(storeQuantity(favoritesList.length));
        dispatch(storeSelected(selectedList));
      } else {
        favoritesList.push(object);
        selectedList.push(pokemonId);
        dispatch(storeList(favoritesList));
        dispatch(storeQuantity(favoritesList.length));
        dispatch(storeSelected(selectedList));
      }
    }
  };

  return (
    <div className={style}>
      <div className="pokemon-card-image-container">
        <img src={image} alt={name} />
      </div>
      <div className="pokemon-card-text-container">
        <div className="number">
          <h5>#{id}</h5>
        </div>
        <Btn
          className="pokemon-card-add-to-favorites"
          text={Constants.components.addToFavorites}
          whenClicked={handleClick}
          state={isSelected ? 'selected' : ''}
        />
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
