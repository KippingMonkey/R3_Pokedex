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
  const [pokemonsPerPage] = useState(12);
  const favoritePokemons = useSelector((state) => state.favoritesData)
  const color = "#000";
  
    const delay = (ms) => new Promise(
  resolve => setTimeout(resolve, ms)
  );

  const getPokemons = async () => {
    setPokemonsLoaded(true);
    setLoading(true);
    const res = await fetch(`${Constants.urls.baseURL}${Constants.urls.limit}`)
    const data = await res.json()
    //wait for all pokemons to load before passing the data
    const pokemonData = await Promise.all(data.results.map(async (pokemon) => {
      const res = await fetch(`${Constants.urls.baseURL}/${pokemon.name}`)
      const data = await res.json()
      await delay(2000);
      return data
    }))
  
    setAllPokemons(pokemonData.sort((a, b) => a.id - b.id))
    setLoading(false);
  }
  

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderedPokemons = showsAllPokemons ? allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : favoritePokemons.list.slice(indexOfFirstPokemon, indexOfLastPokemon);
  console.log("favorites",   favoritePokemons.list)
  console.log("current", renderedPokemons)

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
      <Btn
         className="change-viewed-list"
         text={showsAllPokemons ? Constants.components.myFavorites + favoritePokemons.quantity : Constants.components.allPokemons}
         whenClicked={() => setShowsAllPokemons(!showsAllPokemons) } 
      /> :
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
          pokemons={showsAllPokemons ? allPokemons.length : renderedPokemons.length}
          paginate={paginate}/>
        }
      </div>

    </div>
  );
}

export default App;
