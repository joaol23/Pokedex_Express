import { createUser } from "../controller/user.js";
import { sendError } from "./route.js";

export function routeLogin(app) {
    app.route("/api/login")
        .post(async (req, res) => {
            const body = req.body;
            const response = await createUser(body);
            if (response.error) {
                sendError(response.error, res, req);
                return;
            }

            res.status(response.status).send(response.msg);
        })
}