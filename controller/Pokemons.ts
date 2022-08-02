import { ERROR_BAD_REQUEST, limitPokemonsPage } from '../config/Config';
import { Controller } from './Controller';
import { Exception } from '../Exception/Exception';
import { Request, Response } from "express"

export class PokemonsController extends Controller {
    require = ['name'];
    constructor() {
        super()
    }

    async getPokemons(req: Request, res: Response) {
        try {
            this.setData(req.query);
            const offset = this.business.getOffset(this.data.page, limitPokemonsPage);
            const pokemons = await this.business.getPokemons(offset);
            res.status(200)on({ data: pokemons })
        } catch (err) {
            throw new Exception(ERROR_BAD_REQUEST, err.message, true);
        }
    }

    async getPokemon(req: Request, res: Response) {
        try {
            this.setData(req.params);
            this.validateParams();
            let pokemon = await this.business.getPokemonByName(this.data.name);
            if (pokemon.status == 200) {
                pokemon = await pokemonon();
                res.status(200)on({ data: pokemon });
                return;
            }
            res.status(400).send({ msg: `Pokemón não encontrado...` });
        } catch (err) {            
            if (err instanceof Exception)
                throw new Exception(ERROR_BAD_REQUEST, err.message, true);
        }
    }
}