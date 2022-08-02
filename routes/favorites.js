import { createFavorite } from "../controller/favorites.js";
import { sendError } from "./route.js";

export function routeFavorite(app) {
    app.route("/api/favorite")
        .post(async (req, res) => {;
            const body = req.body;
            const response = await createFavorite(body);
            if (response.error) {
                sendError(response.error, res, req);
                return;
            }
            res.status(response.status).send(response.msg);
        })
}


// export function routeGetFavorites(app) {
//     app.route("/api/favorite")
//         .post(async (req, res) => {;
//             const body = req.body;
//             const response = await creategetFavorites(body);
//             if (response.error) {
//                 sendError(response.error, res, req);
//                 return;
//             }
//             res.status(response.status).send(response.msg);
//         })
// }