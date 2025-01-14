import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching Pokémon data: ${error}` });
    }
});

app.get('/pokemon-species/:name', async (req, res) => {
    const pokemonName = req.params.name;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching Pokémon data: ${error}` });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
