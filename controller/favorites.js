import { ERROR_BAD_REQUEST } from '../config/Config.js';
import { FavoritesBusiness } from '../business/Favorites.js';

export async function createFavorite(data) {
    const FavoriteObj = new FavoritesBusiness;
    if (!data.user_id || !data.poke_id) {
        return { error: ERROR_BAD_REQUEST }
    }

    let favorites = await FavoriteObj.getFavorites()
    favorites = FavoriteObj.addFavoriteToArray(data, favorites)
    await FavoriteObj.insertFavorite(favorites);

    return { status: 200, msg: 'Pokemon Favoritado!' };
}