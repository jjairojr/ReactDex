/** @jsx jsx */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import './style1.css'

import LogoPokemon from './assets/logo.png'

const PokedexList = (props) => {
  const [pokedex, setPokedex] = useState([])
  const [wildPokemon, setWildPokemon] = useState({})
  
  useEffect(() => {
    ShowPokedex()
  }, [])

  const pokeId = () => {
    const min = Math.ceil(1)
    const max = Math.floor(151)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const ShowPokedex = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/'+ pokeId()).then(res => {
      setWildPokemon(res.data)
      axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151').then(response => {
        setPokedex(response.data["results"])
      })
    })
  }

  return (
    <>
    <Header>
      <img style={{width: '200px', margin: '10px 0px 10px 350px '}} src='https://fontmeme.com/permalink/190727/4df513c99fb78fdfc8ddc029ed468c58.png'></img>
    </Header>
    <Body>
      <Section>
        <span>A wild {wildPokemon.name}</span>
        <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+wildPokemon.id+'.png'}alt="?"></img>
        <span>attack's you</span>
      </Section>
    <div>
      <Teste>
        {pokedex.map(p => (<Hehe key={p.name.toString()}> <h3>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3> <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ p.url.split("/")[p.url.split("/").length - 2] +'.png'} alt="pokemon"></img></Hehe>))}
      </Teste>
    </div>
    </Body>
    </>
  )
}

const Teste = styled.div`
display: grid;
grid-template-columns: repeat(4,1fr);
grid-gap: 10px;
`
const Hehe = styled.div`
padding-top: 15px;
border: 1px solid #161616 ;
border-radius: 10px;
display: flex;
flex-direction:column;
align-items: center;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`
const Header = styled.div`
  background: red;
  align-items: center;
  height: 100px;
`
const Body = styled.div`
  padding: 15px;
`

const Section = styled.div`
  text-align: center;
  padding: 20px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default PokedexList