import { ERROR_BAD_REQUEST, NOT_FOUND } from '../config/Config.js';
import { Controller } from './Controller.js';
import { PATH_FAVORITE_DATABASE } from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';
import { Request, Response } from "express"

export class FavoritesController extends Controller {
    requireMain = ['user_id', 'poke_id'];

    constructor() {
        super();
    }

    async createFavorite(req: Request, res: Response) {
        try {
            this.firtStepsController(req);
            const favorites = await this.business.getData(PATH_FAVORITE_DATABASE, true);
            this.data = await this.business.addIdToObject(this.data, PATH_FAVORITE_DATABASE);
            this.data = this.business.addDataToArray(this.data, favorites)
            await this.business.insertData(PATH_FAVORITE_DATABASE, this.data, true);
            res.status(200).send('Pokemon Favoritado!');
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    async deleteFavorite(req: Request, res: Response) {
        try {
            this.setData(req.body);
            this.setRequireDeleteAndList();
            this.validateParams();
            await this.business.deleteFavorite(this.data.id.toString());
            res.status(200).send('Favorito excluído com sucesso!');
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    async listFavorites(req: Request, res: Response) {
        try {
            this.setData(req.query);
            this.setRequireDeleteAndList();
            this.validateParams();
            const favorites = await this.business.getData(PATH_FAVORITE_DATABASE, true);
            const usersFavorites = this.business.getDataByParameter('user_id', favorites, this.data.id)
            if (usersFavorites.length == 0) {
                throw new Exception(NOT_FOUND, 'Nenhum pokemon favoritado encontrado para esse usuário', false);
            }
            res.status(200).send({ data: usersFavorites });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    setRequireDeleteAndList() {
        this.require = ['id']
    }
}