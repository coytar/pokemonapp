import React, { useState, useRef, useEffect } from 'react';
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination';

export default function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState("")
  const [prevPageUrl, setPrevPageUrl] = useState("")
  const [loading, setLoading] = useState(true)

  // Load pokemon once only
  useEffect(() => {
    setLoading(true)
    let cancelToken
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancelToken = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(x => x.name))
    })

    // Cancel an existing request if called multiple times
    return () => cancelToken()
  }, [currentPageUrl])

  // Handle loading screen
  if (loading) return "Loading...";

  // Handle next page
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  // Handle prev page
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <>
      <PokemonList pokemonlist={pokemon} />
      <Pagination nextPage={nextPageUrl ? gotoNextPage : false} prevPage={prevPageUrl ? gotoPrevPage : false} />
    </>
  );
}
