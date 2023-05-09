import './App.css';
import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import PokemonCard from '../Components/PokemonCard/PokemonCard';
import Btn from '../Components/Button/Btn';
import  * as Constants from '../Constants';

const App = () => {

  const[pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false);
  const [pokemonsLoaded, setPokemonsLoaded] = useState(false);
  const color = "#000";

  const getPokemons = async () => {
    setPokemonsLoaded(true);
    setLoading(true);
    const res = await fetch(`${Constants.urls.baseURL}${Constants.urls.limit}`)
    const data = await res.json()

    function getPokemonData(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`${Constants.urls.baseURL}/${pokemon.name}`)
        const data =  await res.json()
        setPokemons( currentList => [...currentList, data])
        pokemons.sort((a, b) => a.id - b.id)
        setLoading(false);
      })
    }
    getPokemonData(data.results)
  }

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
      <div className="pokedex-container">
        <div className="pokemon-card-container">
          {pokemons.map( (pokemonStats, index) => 
            <PokemonCard
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
        </div>
      </div>
    </div>
  );
}

export default App;
