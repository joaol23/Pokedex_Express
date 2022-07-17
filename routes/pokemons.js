import { PokemonsController } from '../controller/Pokemons.js';

const PokemonsObj = new PokemonsController();
// export const routes = [
//     { method: "get", path: '/pokemon', url: `${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=0` }
// ]

export function routePokemon(app) {
    app.get("/api/pokemons", async (req, res) => {
        try {
            await PokemonsObj.getPokemons(req, res)
        } catch (err) {
            res.status(err.status).send({ msg: err.message });
        }
    })

    app.get("/api/pokemon/:name", async (req, res) => {
        try {
            await PokemonsObj.getPokemon(req, res)
        } catch (err) {
            res.status(err.status).send({ msg: err.message });
        }
    })
}