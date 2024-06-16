import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Card, Badge } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const PokemonDetail = ({ isDarkMode }) => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  if (!pokemon) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  function padNumber(number) {
    return number.toString().padStart(3, '0');
  }

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  // Prepare data for the bar chart
  const statLabels = pokemon.stats.map(stat => stat.stat.name);
  const statValues = pokemon.stats.map(stat => stat.base_stat);
  const maxStatValue = Math.max(...statValues) + 20; // Adding padding for better visualization
  const barColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40'
  ];

  const chartData = {
    labels: statLabels,
    datasets: [
      {
        label: 'Background',
        data: new Array(statValues.length).fill(maxStatValue),
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        borderWidth: 0,
        barThickness: 25,
        order: 1, // Set order to control stacking
      },
      {
        label: `${pokemon.name}'s Stats`,
        data: statValues,
        backgroundColor: barColors,
        borderRadius: 20, // More rounded corners
        borderSkipped: false,
        barThickness: 25,
        order: 2, // Set order to control stacking
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        display: false,
        grid: {
          display: false, // Hide grid lines on the x-axis
        },
      },
      y: {
        display: true,
        ticks: {
          font: {
            size: 14,
          },
        },
        grid: {
          display: false, // Hide grid lines on the y-axis
        },
        stacked: true,
      },
      xAxes: [{
        stacked: true,
      }],
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: 'black',
        anchor: 'end',
        align: 'right',
        offset: 5,
        font: {
          weight: 'bold',
        },
        formatter: (value, context) => {
          return context.datasetIndex === 1 ? value : '';
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      bar: {
        borderRadius: 20,
        barThickness: 30,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    maintainAspectRatio: false,
  };
  


  return (
    <Container>
      <Row>
        <Col>
          <Card style={{backgroundColor: isDarkMode
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
                : "black"}}>
            <Card.Img variant="top" src={imageUrl} alt={pokemon.name} loading="lazy" />       
              <Card.Title>{pokemon.name}</Card.Title>
          </Card>
        </Col>

        <Col>
          <Row>
            <Col>
              <Card style={{
                padding: "0px",
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

                }}>
                <Card.Body>
                <p>Pokedex Number: </p>
                  <center><Card.Title>{'#' + padNumber(pokemon.id)}</Card.Title></center>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{marginBottom: '20px', padding: "2px",
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
              : "black"

              }}>
                <Card.Body>
          
                <center><p>Type: </p></center>
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
                      marginLeft: index > 0 ? "5px" : "0", // Adjust margin for subsequent badges
                      display: "inline-flex",
                      alignItems: "center"
                    }}
                  >
                    <span className='card__badge-text' style={{ fontSize: "1.25rem" }}>{type.type.name}</span>
                  </Badge>
                
                ))}
              
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Card style={{backgroundColor: isDarkMode
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
                : "black"}}> 
            <Card.Body style={{ height: '400px', width: '100%'}}>
                <Bar data={chartData} options={chartOptions} />
              </Card.Body>
            </Card>
          </Row>

          <Row>
          <Card style={{marginTop: '20px', padding: "5px", backgroundColor: isDarkMode
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
                : "black"}}>
              <Card.Body>

            <p style={{ fontWeight: "bold", margin: "0", display: "inline-flex", alignItems: "center", fontSize: "0.9rem" }}>Abilities:</p>
              {pokemon.abilities.map((ability, index) => (
                  <Badge
                    key={index}
                    pill
                    bg
                    className='card__badge'
                    style={{
                      background: isDarkMode
                      ? "white"
                      : "black",
                      color: isDarkMode
                      ? "black"
                      : "white"
                    }}
                  >
                    <span className='card__badge-text' style={{ fontSize: "0.9rem" }}>{ability.ability.name}</span>
                  </Badge>
                ))}
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonDetail;
