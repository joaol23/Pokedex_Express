import { ERROR_BAD_REQUEST, limitPokemonsPage } from '../config/Config.js';
import { Controller } from './Controller.js';
import { Exception } from '../Exception/Exception.js';

export class PokemonsController extends Controller {
    require = ['name'];
    constructor() {
        super()
    }

    async getPokemons(req, res) {
        try {
            this.setData(req.query);
            const offset = this.business.getOffset(this.data.page, limitPokemonsPage);
            const pokemons = await this.business.getPokemons(offset);
            res.status(200).json({ data: pokemons })
        } catch (err) {
            throw new Exception({ message: err.message, status: ERROR_BAD_REQUEST }, true);
        }
    }

    async getPokemon(req, res) {
        try {
            this.setData(req.params);
            this.validateParams();
            let pokemon = await this.business.getPokemonByName(this.data.name);
            if (pokemon.status == 200) {
                pokemon = await pokemon.json();
                res.status(200).json({ data: pokemon });
                return;
            }
            res.status(400).send({ msg: `Pokemón não encontrado...` });
        } catch (err) {
            throw new Exception({ message: err.message, status: ERROR_BAD_REQUEST }, true);
        }
    }
}