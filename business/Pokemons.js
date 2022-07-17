import { apiPokemonUrl, limitPokemonsPage } from '../config/Config.js';
import { Business } from './Business.js';

export class PokemonsBusiness extends Business {
    constructor() {
        super();
    }

    async getPokemons(offset) {
        let dataPokemons = await this.model.getDataByUrl(`${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=${offset}`);
        if (dataPokemons.status == 200) {
            dataPokemons = await dataPokemons.json();

            dataPokemons = dataPokemons.results.map(async (pokemon) => {
                return await this.getEachPokemonInfo(pokemon)
            })

            return await Promise.all(dataPokemons);
        }

        return { error: dataPokemons.status };
    }

    async getEachPokemonInfo(pokemon) {
        return await (await this.model.getDataByUrl(pokemon.url)).json();
    }

    async getPokemonByName(name) {
        return await this.model.getDataByUrl(`${apiPokemonUrl}pokemon/${name}`);        
    }
}