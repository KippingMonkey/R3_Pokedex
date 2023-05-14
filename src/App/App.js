import './App.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import PokemonCard from '../Components/PokemonCard/PokemonCard';
import Btn from '../Components/Button/Btn';
import  * as Constants from '../Constants';
import Pagination from '../Components/Pagination/Pagination';

const App = () => {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonsLoaded, setPokemonsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showsAllPokemons, setShowsAllPokemons] = useState(true)
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonsPerPage] = useState(12);
  const favoritePokemons = useSelector((state) => state.favoritesData);
  const color = "#000";
  
  //Used on lower limits to allow spinner to show
  //   const delay = (ms) => new Promise(
  // resolve => setTimeout(resolve, ms)
  // );

  const getPokemons = async () => {
    setPokemonsLoaded(true);
    setLoading(true);
    const res = await fetch(`${Constants.urls.baseURL}${Constants.urls.limit}`)
    const data = await res.json()
    //wait for all pokemons to load before passing the data
    const pokemonData = await Promise.all(data.results.map(async (pokemon) => {
      const res = await fetch(`${Constants.urls.baseURL}/${pokemon.name}`)
      const data = await res.json()
      // await delay(500);
      return data
    }))
  
    setAllPokemons(pokemonData.sort((a, b) => a.id - b.id))
    setLoading(false);
  }
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const changeViewedList = () => {
    setShowsAllPokemons(!showsAllPokemons)
    setCurrentPage(1);
  }

  const filteredPokemons = allPokemons.filter( (pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  
  const renderedPokemons = showsAllPokemons ? 
  filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : 
  favoritePokemons.list.slice(indexOfFirstPokemon, indexOfLastPokemon);
  

  return (
    <div className="app-container">
      <div className="loader-container">
        <ClipLoader
          color={color}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <h1>{Constants.app.header}</h1>
      {pokemonsLoaded ? 
        allPokemons.length === 0 ? null :
      <div className="top-row-container">
        <input
          className='search-input'
          type="text"
          placeholder={Constants.app.searchPlaceholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Btn
         className="change-viewed-list"
         text={showsAllPokemons ? Constants.components.myFavorites + favoritePokemons.quantity : Constants.components.allPokemons}
         whenClicked={() => changeViewedList() } 
         /> 
      </div> :
      <Btn 
        className="load-pokemons"
        text={Constants.components.loadPokemons}
        whenClicked={() => getPokemons()}
      /> 
    }
      <div id="pokemon-gallery" className="pokedex-container">
        <div className="pokemon-card-container">
          { renderedPokemons.length === 0 ? ((!pokemonsLoaded || loading) ? null : <h2>{Constants.app.noPokemonsMessage}</h2>):
          renderedPokemons.map( (pokemonStats) => 
            <PokemonCard
              key={pokemonStats.id}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
              object={pokemonStats}
            />)}
        </div>
        {(!pokemonsLoaded || loading) ? null :
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          pokemons={showsAllPokemons ? filteredPokemons.length : favoritePokemons.list.length}
          currentPage={currentPage}
          paginate={paginate}/>
        }
      </div>

    </div>
  );
}

export default App;
