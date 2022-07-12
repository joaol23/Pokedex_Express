import fs from 'fs';
import { ERROR_BAD_REQUEST, PATH_FAVORITE_DATABASE } from '../config/config.js';

export async function createFavorite(data){
    if (!data.user_id || !data.poke_id) {
        return { error: ERROR_BAD_REQUEST }
    }
}