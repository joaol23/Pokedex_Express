import { FavoritesController } from "../controller/favorites.js";
import { sendError } from "./route.js";

const FavoritesObj = new FavoritesController()

export function routeFavorite(app) {
    app.route("/api/favorite")
        .post(async (req, res) => {
            const body = req.body;
            const response = await FavoritesObj.createFavorite(body);
            if (response.error) {
                sendError(response.error, res, req);
                return;
            }
            res.status(response.status).send(response.msg);
        })
}