import { ERROR_BAD_REQUEST, PATH_FAVORITE_DATABASE } from '../config/config.js';
import {insertFavorite, getFavorites, addFavoriteToArray} from '../business/favorites.js';

export async function createFavorite(data){
    if (!data.user_id || !data.poke_id || !data.poke_name) {
        return { error: ERROR_BAD_REQUEST }
    }

    let favorites = await getFavorites()
    favorites = addFavoriteToArray(data, favorites)
    await insertFavorite(favorites);

    return { status: 200, msg: 'Pokemon Favoritado!' };
}