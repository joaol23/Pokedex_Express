import { Business } from './Business.js';
import { PATH_FAVORITE_DATABASE } from '../config/ConfigPath.js';
import { FavoriteProps } from '../data/@types/Favorites.js'

export class FavoritesBusiness extends Business {
    constructor() {
        super();
    }

    getFavoritesWithoutId(favorites: FavoriteProps[], id: string) {
        return favorites.filter(user => user.id != id);
    }

    async deleteFavorite(id: string) {
        const favorites = await super.getData(PATH_FAVORITE_DATABASE, true);
        const newFavorites = this.getFavoritesWithoutId(favorites, id);
        return await super.insertData(PATH_FAVORITE_DATABASE, newFavorites, true)
    }
}
