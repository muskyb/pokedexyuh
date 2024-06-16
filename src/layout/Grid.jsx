import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PokemonCard from '../components/Pokemoncard';

const Grid = ({ pokemons, next, isDarkMode }) => {
  return (
    <div className='grid'>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className='g-4'>
        {pokemons.map((pokemon) => (
          <Col key={pokemon.url}>
            <PokemonCard isDarkMode={isDarkMode} pokemon={pokemon} />
          </Col>
        ))}
      </Row>
      {pokemons.length >= 20 && (
        <div className="grid__wrapper-button text-center mt-4">
          <Button className='grid__button' onClick={next}>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default Grid;
