import { ERROR_BAD_REQUEST } from '../config/Config.js';
import { Controller } from './Controller.js';
import { PATH_FAVORITE_DATABASE } from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';

export class FavoritesController extends Controller {
    require = ['user_id', 'poke_id'];

    constructor() {
        super();
    }

    async createFavorite(req, res) {
        try {
            this.setData(req.body);
            this.validateParams();
            const favorites = await this.business.getData(PATH_FAVORITE_DATABASE, true);
            this.data = this.business.addDataToArray(this.data, favorites)
            await this.business.insertData(PATH_FAVORITE_DATABASE, this.data, true);
            res.status(200).send('Pokemon Favoritado!');
        } catch (err) {
            throw new Exception({ message: err.message, status: ERROR_BAD_REQUEST }, true);
        }
    }
}