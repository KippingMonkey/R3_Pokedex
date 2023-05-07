import React, { useEffect, useState } from 'react'
import PokemonCard from '../Components/PokemonCard/PokemonCard'

const App = () => {

   const[pokemons, setPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function getPokemonData(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
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
    <div className="app-contaner">
      <h1>My pokedex</h1>
      <div className="pokedex-container">
        <div className="pokemonCard-container">
          {pokemons.map( (pokemonStats, index) => 
            <PokemonCard
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
          
        </div>
          <button className="load-more" onClick={() => getPokemons()}>Load more</button>
      </div>
    </div>
  );
}

export default App;
