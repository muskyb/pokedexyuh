import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Search from './components/Search';
import Grid from './layout/Grid';
import PokemonDetail from './components/PokemonDetail'; // Assuming you have a component for Pokemon details

import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const ConditionalSearch = ({ onHandleSearch }) => {
  const location = useLocation();
  return location.pathname === '/' ? <Search onHandleSearch={onHandleSearch} /> : null;
};

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [search, setSearch] = useState([]);
  const [searching, setSearching] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = async (textSearch) => {
    if (!textSearch) {
      setSearch([]);
      setNotFound(false);
      return;
    }

    setNotFound(false);
    setSearching(true);
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${textSearch.toLowerCase()}`);
    const data = await api.json().catch(() => undefined);
    if (!data) {
      setNotFound(true);
    } else {
      setSearch([data]);
    }
    setSearching(false);
  };

  const showPokemons = async (limit = 20, offset = 0) => {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await api.json();
    const promises = data.results.map(async pokemon => {
      const result = await fetch(pokemon.url);
      const res = await result.json();
      return res;
    });

    const results = await Promise.all(promises);

    setPokemons(prev => [...prev, ...results]);
    setNotFound(false);
    setTotal(prev => prev + results.length);
  };

  const nextPokemon = () => {
    showPokemons(20, total);
  };
  useEffect(() => {
    if (!searching) {
      showPokemons();
    }
  }, [searching]); 
  

  const poke = search.length > 0 ? search : pokemons;

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
<div style={{ backgroundColor: isDarkMode ? '#000' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
<Router>
      <Container className={`container ${isDarkMode ? 'dark-mode-background' : 'light-mode-background'}`}>
        <Navbar title="MUSKYB'S POKEDEX HEHE !" isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <ConditionalSearch onHandleSearch={handleSearch} />
        <Routes>
          <Route 
            path="/" 
            element={
              notFound ? (
                <div>Pokemon not found</div>
              ) : (
                <Grid pokemons={poke} next={nextPokemon} isDarkMode={isDarkMode} />
              )
            } 
          />
          <Route path="pokemon/:pokemonName" element={<PokemonDetail isDarkMode={isDarkMode} />} />
        </Routes>
      </Container>
      <Footer />
    </Router>

    </div>
      );
}

export default App;
