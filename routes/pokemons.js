import { apiPokemonUrl, limitPokemonsPage } from '../config/config.js'
import fetch from 'node-fetch';
import { sendError } from './route.js';

// export const routes = [
//     { method: "get", path: '/pokemon', url: `${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=0` }
// ]

export function routePokemon(app) {
    app.get("/api/pokemons", async (req, res) => {
        let page = req.query.page;
        const pokemons = await getPokemons(page);
        if (pokemons.error) {
            sendError(pokemons.error, res, req);
            return;
        }

        res.status(200).json({ data: pokemons })
    })

    app.get("/api/pokemon/:name", async (req, res) => {
        const pokemonName = req.params.name;
        const pokemon = await getPokemonByName(pokemonName);
        if (pokemon.error) {
            sendError(pokemon.error, res, req);
            return;
        }

        res.status(200).json({ data: pokemon });
    })
}

async function getPokemons(pages) {
    let dataPokemons = await fetch(`${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=0`);
    if (dataPokemons.status == 200) {
        dataPokemons = await dataPokemons.json();

        dataPokemons = dataPokemons.results.map(async (pokemon) => {
            let eachPokemonData = await (await fetch(pokemon.url)).json();
            return eachPokemonData;
        })

        return await Promise.all(dataPokemons);
    }

    return { error: dataPokemons.status };
}

async function getPokemonByName(name) {
    let pokemon = await fetch(`${apiPokemonUrl}pokemon/${name}`);
    if (pokemon.status == 200) {
        return await pokemon.json();
    }

    return { error: pokemon.status };
}

