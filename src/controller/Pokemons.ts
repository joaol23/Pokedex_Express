import { ERROR_BAD_REQUEST, limitPokemonsPage } from '../config/Config.js';
import { Controller } from './Controller.js';
import { Exception } from '../Exception/Exception.js';
import { Request, Response } from "express"

export class PokemonsController extends Controller {
    requireMain = ['name'];
    constructor() {
        super()
    }

    async getPokemons(req: Request, res: Response) {
        try {
            this.setData(req.query);
            const offset = this.business.getOffset(this.data.page, limitPokemonsPage);
            const pokemons = await this.business.getPokemons(offset);
            res.status(200).json({ data: pokemons })
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(ERROR_BAD_REQUEST, err.message, true);
            else
                console.log(err)
        }
    }

    async getPokemon(req: Request, res: Response) {
        try {
            this.firtStepsController(req);
            let pokemon = await this.business.getPokemonByName(this.data.name);
            if (pokemon.status == 200) {
                pokemon = await pokemon.json();
                res.status(200).json({ data: pokemon });
                return;
            }
            res.status(400).send({ msg: `Pokemón não encontrado...` });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(ERROR_BAD_REQUEST, err.message, true);
            else
                console.log(err)
        }
    }
}