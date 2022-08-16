import { Model } from "./Model.js";

export class FavoritesModel extends Model {

    override getPath() : string{
        return 'database/favorites.json'
    }
}