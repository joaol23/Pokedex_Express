import { PATH_FAVORITE_DATABASE } from '../config/Config.js';
import { FavoritesModel } from '../model/Favorites.js';
import { Business } from './Business.js';

export class FavoritesBusiness extends Business {
    constructor() {
        super();
        this.model = new FavoritesModel;
    }

    async getFavorites() {
        return await this.model.getData(PATH_FAVORITE_DATABASE, true);
    }

    addFavoriteToArray(favorite, arrayFavorites) {
        arrayFavorites.push(favorite);
        return arrayFavorites;
    }

    async insertFavorite(data) {
        return await this.model.insertData(PATH_FAVORITE_DATABASE, data, true);
    }

    async idExist(id) {

    }
}