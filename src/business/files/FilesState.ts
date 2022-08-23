import { Business } from '../Business.js';
import { FavoriteProps } from '../../data/@types/Favorites.js'

export class FilesStateBusiness extends Business {
    constructor() {
        super();
    }

    override getNamespace() : string{
        return 'files/'
    }
}
