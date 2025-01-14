import style from './Pokedex.module.css';
import PokemonDetails from '../PokemonDetails/PokemonDetails.jsx';
import { useEffect, useState } from 'react';

function Pokedex() {
    const [userInput, setUserInput] = useState(""); 
    const [searchQuery, setSearchQuery] = useState(""); // has to be lowercase for api call!

    const handleSearchClick = () => {
        setSearchQuery(userInput.toLowerCase());
    };

    return(
        <>
            <div className={style.pokedexContainer}>
                <div className={style.title}>
                    Pokédex
                </div>
                <div className={style.searchBar}>
                <input
                        placeholder='Enter a Pokemon name...'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button onClick={handleSearchClick}>Search</button>
                </div>
                <div className={style.results}>
                    {searchQuery && <PokemonDetails pokemonName={searchQuery}/>}
                </div>
            </div>
        </>
    );
}

export default Pokedex;
