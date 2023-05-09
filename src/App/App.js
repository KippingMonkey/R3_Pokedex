import './App.css';
import React, { useEffect, useState } from 'react';
import PokemonCard from '../Components/PokemonCard/PokemonCard';
import Btn from '../Components/Button/Btn';
import  * as Constants from '../Constants';

const App = () => {

   const[pokemons, setPokemons] = useState([])
   const [loadMore, setLoadMore] = useState(`${Constants.urls.baseURL}${Constants.urls.limit}`)

  const getPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    // setLoadMore(data.next)

    function getPokemonData(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`${Constants.urls.baseURL}/${pokemon.name}`)
        const data =  await res.json()
        setPokemons( currentList => [...currentList, data])
        pokemons.sort((a, b) => a.id - b.id)
      })
    }
    getPokemonData(data.results)
  }

 useEffect(() => {
  getPokemons()
 }, [])

  return (
    <div className="app-container">
      <h1>{Constants.app.header}</h1>
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
        <Btn className={Constants.classNames.loadMore}
             text={Constants.components.loadMore}
             whenClicked={() => getPokemons()}
        />
      </div>
    </div>
  );
}

export default App;
