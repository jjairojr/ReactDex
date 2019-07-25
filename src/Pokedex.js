/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import axios from 'axios'

import PokemonCard from './PokemonCard'

const PokedexList = (props) => {
  const [pokedex, setPokedex] = useState([])
  const [wildPokemon, setWildPokemon] = useState({})
  
  useEffect(() => {
    findWildPokemon()
  }, [])

  useEffect(() => {
    gottaCatch()
  },[])

  const pokeId = () => {
    const min = Math.ceil(1)
    const max = Math.floor(151)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const findWildPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/'+ pokeId()).then(res => {
      setWildPokemon(res.data)
      console.log(res.data)
    })
  }

  const gottaCatch = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151').then(response => {
      setPokedex(response.data["results"])
      // console.log(response.data['results'])

    })
  }
  return (
    <>
    <h1>A Wild {wildPokemon.name}</h1>
    <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+wildPokemon.id+'.png'}alt="?"></img>
    <div>
      <h1>
      {pokedex.map(p => (p.name +'\n' + p.url.split("/")[p.url.split("/").length - 2] + '\n'))}
      </h1>
    </div>
    </>
  )
}

export default PokedexList