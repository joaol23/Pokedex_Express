import { FavoritesController } from "../controller/Favorites.js";
import express, { Request, Response } from "express"
import { Exception } from "../Exception/Exception.js";

const FavoritesObj = new FavoritesController()

export function routeFavorite(app: express.Application) {
    app.route("/api/favorite")
        .post(async (req: Request, res: Response) => {
            try {
                await FavoritesObj.createFavorite(req, res)
            }
            catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
            }
        })
}
