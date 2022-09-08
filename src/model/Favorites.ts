import { Model } from "./Model.js";

export class FavoritesModel extends Model {

    getPath() : string{
        return 'database/favorites.json'
    }
}