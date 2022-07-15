import { ERROR_BAD_REQUEST } from '../config/Config.js';
import { Controller } from './Controller.js';
import { PATH_FAVORITE_DATABASE } from '../config/ConfigPath.js';

export class FavoritesController extends Controller {
    constructor() {
        super();
    }

    async createFavorite(data) {
        if (!data.user_id || !data.poke_id) {
            return { error: ERROR_BAD_REQUEST }
        }

        let favorites = await this.business.getData(PATH_FAVORITE_DATABASE, true)
        favorites = this.business.addDataToArray(data, favorites)
        await this.business.insertData(PATH_FAVORITE_DATABASE, favorites, true);

        return { status: 200, msg: 'Pokemon Favoritado!' };
    }
}