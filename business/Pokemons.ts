import { apiPokemonUrl, limitPokemonsPage } from '../config/Config';
import { Business } from './Business';

export class PokemonsBusiness extends Business {
    constructor() {
        super();
    }

    async getPokemons(offset) {
        let dataPokemons = await this.model.getDataByUrl(`${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=${offset}`);
        if (dataPokemons.status == 200) {
            dataPokemons = await dataPokemonson();

            dataPokemons = dataPokemons.results.map(async (pokemon) => {
                return await this.getEachPokemonInfo(pokemon)
            })

            return await Promise.all(dataPokemons);
        }

        return { error: dataPokemons.status };
    }

    async getEachPokemonInfo(pokemon) {
        return await (await this.model.getDataByUrl(pokemon.url))on();
    }

    async getPokemonByName(name) {
        return await this.model.getDataByUrl(`${apiPokemonUrl}pokemon/${name}`);        
    }
}