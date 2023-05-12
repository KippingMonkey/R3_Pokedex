import './App.css';
import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import PokemonCard from '../Components/PokemonCard/PokemonCard';
import Btn from '../Components/Button/Btn';
import  * as Constants from '../Constants';
import Pagination from '../Components/Pagination/Pagination';

const App = () => {

  const [allPokemons, setAllPokemons] = useState([])
  const [loading, setLoading] = useState(false);
  const [pokemonsLoaded, setPokemonsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(8);
  const color = "#000";
  
    const delay = (ms) => new Promise(
  resolve => setTimeout(resolve, ms)
  );

  const getPokemons = async () => {
    setPokemonsLoaded(true);
    setLoading(true);
    const res = await fetch(`${Constants.urls.baseURL}${Constants.urls.limit}`)
    const data = await res.json()

    function getPokemonData(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`${Constants.urls.baseURL}/${pokemon.name}`)
        const data =  await res.json()
        await delay(2000);
        setAllPokemons( currentList => [...currentList, data])
        allPokemons.sort((a, b) => a.id - b.id)
        setLoading(false);
      })
    }
    getPokemonData(data.results)
  }

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemonList = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 

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
      {pokemonsLoaded ? null :
      <Btn className="load-pokemons"
            text={Constants.components.loadPokemons}
            whenClicked={() => getPokemons()}
      /> 
    }
      <div id="pokemon-gallery" className="pokedex-container">
        <div className="pokemon-card-container">
          {currentPokemonList.map( (pokemonStats, index) => 
            <PokemonCard
              key={index}
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
          pokemons={allPokemons.length}
          paginate={paginate}/>
        }
      </div>

    </div>
  );
}

export default App;
