import { apiPokemonUrl, limitPokemonsPage } from '../config/config.js'
import fetch from 'node-fetch';
var error;


// export const routes = [
//     { method: "get", path: '/pokemon', url: `${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=0` }
// ]

export function routePokemon(app) {
    app.get("/api/pokemons", async (req, res) => {
        const pokemons = await getPokemons();
        if (pokemons) {
            res.status(200).json({ data: pokemons })
            return;
        }

        res.sendStatus(error.status);
    })

    app.get("/api/pokemon/:name", async (req, res) => {
        const pokemonName = req.params.name;
        const pokemon = await getPokemonByName(pokemonName);
        if (pokemon) {
            res.status(200).json({ data: pokemon });
            return;
        }

        res.sendStatus(error.status);
    })
}

async function getPokemons() {
    let dataPokemons = await fetch(`${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=0`);
    if (dataPokemons.status == 200) {
        dataPokemons = await dataPokemons.json();

        dataPokemons = dataPokemons.results.map(async (pokemon) => {
            let eachPokemonData = await (await fetch(pokemon.url)).json();
            return eachPokemonData;
        })

        return await Promise.all(dataPokemons);
    }


    setError({ status: dataPokemons.status, message: dataPokemons.statusText });
    return false;
}

async function getPokemonByName(name) {
    let pokemon = await fetch(`${apiPokemonUrl}pokemon/${name}`);
    if (pokemon.status == 200) {
        return await pokemon.json();
    }

    setError({ status: pokemon.status, message: pokemon.statusText });
    return false;
}

function setError(err) {
    error = err;
}

