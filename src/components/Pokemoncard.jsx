import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon, isDarkMode }) => {
  if (!pokemon || !pokemon.types || pokemon.types.length === 0) {
    return null; // Handle case where pokemon or its types are not defined
  }

  function padNumber(number) {
    return number.toString().padStart(3, '0');
  }



  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className="flip__card">
      <div className="card__inner">
        <div className="card__front">
          <Card
            style={{
              backgroundColor: isDarkMode
                ? 'transparent'
                : `var(--bg-poke-color-light-${pokemon.types[0].type.name})`,
              borderRadius: "15px",
              border: "none",
              boxShadow: isDarkMode
                ? `0 0 10px 5px var(--bg-poke-color-dark-${pokemon.types[0].type.name})`
                : "none",
              width: "100%",
              color: isDarkMode
                ? "white"
                : "black",
            }}
          >
          
            <Card.Body>
              <div className='card__title'>
                <Card.Img variant="top" src={imageUrl} alt={pokemon.name} loading='lazy' />
              </div>
              <Card.Title className="glow" style={{ 
                textAlign: "center", 
                fontWeight: "bold", 
                textTransform: "capitalize" 
                }}>{pokemon.name}</Card.Title>
              <center><span className='card__title-text'>{`${padNumber(pokemon.id)}`}</span></center>
            </Card.Body>
          </Card>
        </div>         
        <div className="card__back">
        <Link  className="link" to={`/pokemon/${pokemon.name}` }>
          <Card
            style={{
              backgroundColor: isDarkMode
              ? `transparent`
              : `var(--bg-poke-color-light-${pokemon.types[0].type.name})`,
              borderRadius: "15px",
              border: "none",
              boxShadow: isDarkMode
                ? `0 0 10px 5px var(--bg-poke-color-dark-${pokemon.types[0].type.name})`
                : "none",
              width: "100%",
              color: isDarkMode
                ? "white"
                : "black",
            }}
          >
            <Card.Body style={{ textAlign: "center", padding: "10px 20px" }}>
              <Card.Img style={{ width: "65%", height: "auto" }} variant="top" src={imageUrl} alt={pokemon.name} loading='lazy' />
              <Card.Title className="glow" style={{fontWeight: "bold", textTransform: "capitalize", marginBottom: "5px" }}>{pokemon.name}</Card.Title>
              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
                <div>
                  <p style={{ margin: "0", fontSize: "0.9rem" }}>Height</p>
                  <p style={{ fontWeight: "bold", margin: "0", fontSize: "0.9rem" }}>{parseFloat(pokemon.height / 10.0) + " m"}</p>
                </div>
                <div>
                  <p style={{ margin: "0", fontSize: "0.9rem" }}>Weight</p>
                  <p style={{ fontWeight: "bold", margin: "0", fontSize: "0.9rem" }}>{parseFloat(pokemon.weight / 10.0) + " kg"}</p>
                </div>
              </div>
              <p className='card__number'>{'#' + padNumber(pokemon.id)}</p>


          <div className='type__container'>
            <p style={{ fontWeight: "bold", margin: "0", display: "inline-flex", alignItems: "center", fontSize: "0.9rem" }}>Type:</p>
              {pokemon.types.map((type, index) => (
                  <Badge
                    key={index}
                    pill
                    bg
                    className='card__badge'
                    style={{
                      background: `var(--bg-poke-color-dark-${type.type.name})`,
                      boxShadow: isDarkMode
                        ? `0 0 10px 5px var(--bg-poke-color-dark-${type.type.name})`
                        : "none",
                      marginLeft: index > 0 ? "5px" : "0",
                      display: "inline-flex",
                      alignItems: "center"
                    }}
                  >
                    <span className='card__badge-text' style={{ fontSize: "0.9rem" }}>{type.type.name}</span>
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
