import { apiPokemonUrl, limitPokemonsPage } from '../config/Config.js';
import { Business } from './Business.js';
import { PokemonProps } from '../data/@types/Pokemon.js'

export class PokemonsBusiness extends Business {
    constructor() {
        super();
    }

    async getPokemons(offset: string) {
        let dataPokemons = await this.model.getDataByUrl(`${apiPokemonUrl}pokemon?limit=${limitPokemonsPage}&offset=${offset}`);
        if (dataPokemons.status == 200) {
            dataPokemons = dataPokemons.results.map(async (pokemon: PokemonProps) => {
                return await this.getEachPokemonInfo(pokemon)
            })

            return await Promise.all(dataPokemons);
        }

        return { error: dataPokemons.status };
    }

    async getEachPokemonInfo(pokemon: PokemonProps) {
        return await (await this.model.getDataByUrl(pokemon.url)).json();
    }

    async getPokemonByName(name: string) {
        return await (await this.model.getDataByUrl(`${apiPokemonUrl}pokemon/${name}`)).json();
    }
}