import { PATH_FAVORITE_DATABASE} from '../config/config.js';
import { Favoritos } from '../model/favoritos.js';


export async function getFavorites() {
    const FavoritosObj = new Favoritos();
    return await FavoritosObj.getData(PATH_FAVORITE_DATABASE, true);
}

export function addFavoriteToArray(favorite, arrayFavorites) {
    arrayFavorites.push(favorite);
    return arrayFavorites;
}

export async function insertFavorite(data)
{
    const FavoritosObj = new Favoritos();
    return await FavoritosObj.insertData(PATH_FAVORITE_DATABASE, data, true);
}

export async function idExist(id){

}