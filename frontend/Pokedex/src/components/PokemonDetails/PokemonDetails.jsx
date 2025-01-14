import style from './PokemonDetails.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonDetails({ pokemonName }) {
    const [pokemon, setPokemon] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/pokemon/${pokemonName}`);
                const response2 = await axios.get(`http://localhost:5000/pokemon-species/${pokemonName}`);
                setPokemonDescription(response2.data);
                setPokemon(response.data);
            } catch (err) {
                setError('Error fetching Pokémon data.');
                console.error(err);
            }
        };
        fetchDetails();
    }, [pokemonName]);

    if(error) {
        return <div>{error}</div>;
    }

    if(!pokemon){
        return <div>Loading...</div>;
    }

    return(
        <>
            <p className={style.pokemonNumber}>#{pokemon.id}</p>
            <p className={style.pokemonName}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            <img className={style.pokemonImage} src={pokemon.sprites.front_default} alt={pokemon.name}/>
            <div className={style.pokemonType}>
                Type:
                <ul>
                    {pokemon.types.map((typeObj) => (
                        <li key={typeObj.type.name}>
                            {typeObj.type.name}
                            <img src={`/types/${typeObj.type.name}.svg`} />
                        </li>
                    ))}
                </ul>
            </div>
            <p className={style.pokemonHeight}>Height: {(pokemon.height * 0.1).toFixed(1)} Meters</p>
            <p className={style.pokemonWeight}>Weight: {(pokemon.weight * 0.1).toFixed(1)} Kg</p>
            <div className={style.pokemonDescription}>
                Description: {pokemonDescription.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text}
            </div>
            <div className={style.pokemonStats}>
                <p >
                    HP: {pokemon.stats[0].base_stat}
                </p>
                <p >
                    Attack: {pokemon.stats[1].base_stat}
                </p>
                <p >
                    Defense: {pokemon.stats[2].base_stat}
                </p>
                <p >
                    Special-Attack: {pokemon.stats[3].base_stat}
                </p>
                <p >
                    Special-Defense: {pokemon.stats[4].base_stat}
                </p>
                <p >
                    Speed: {pokemon.stats[5].base_stat}
                </p>
            </div>
        </>
    );
}

export default PokemonDetails;
