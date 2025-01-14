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
            <div className={style.firstContainer}>
                <div className={style.pokemonNumber}>#{pokemon.id}</div>
                <div className={style.pokemonName}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
                <img className={style.pokemonImage} src={pokemon.sprites.front_default} alt={pokemon.name}/>
                <div className={style.pokemonDescription}>
                    Description: {pokemonDescription.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text}
                </div>
            </div>

            <div className={style.secondContainer}>
                <div className={style.pokemonStats}>
                    <div className={style.stat}>
                        Health: {pokemon.stats[0].base_stat}
                    </div>
                    <div className={style.stat}>
                        Attack: {pokemon.stats[1].base_stat}
                    </div>
                    <div className={style.stat}>
                        Defense: {pokemon.stats[2].base_stat}
                    </div>
                    <div className={style.stat}>
                        Special-Attack: {pokemon.stats[3].base_stat}
                    </div>
                    <div className={style.stat}>
                        Special-Defense: {pokemon.stats[4].base_stat}
                    </div>
                    <div className={style.stat}>
                        Speed: {pokemon.stats[5].base_stat}
                    </div>
                </div>

                <div className={style.pokemonType}>
                    Types:
                        {pokemon.types.map((typeObj) => (   
                                <div className={style.typeContainer}>
                                    {typeObj.type.name} <img src={`/types/${typeObj.type.name}.svg`} />
                                </div>
                        ))}
                </div>

                <p className={style.pokemonHeight}>Height: {(pokemon.height * 0.1).toFixed(1)} Meters</p>
                
                <p className={style.pokemonWeight}>Weight: {(pokemon.weight * 0.1).toFixed(1)} Kg</p>
                
                <div className={style.pokemonAbilities}>
                    Abilities: {pokemon.abilities.map((abilityObj) => (   
                                    <div className={style.pokemonAbility}>{abilityObj.ability.name}</div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default PokemonDetails;
