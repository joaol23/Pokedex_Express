import { UserController } from "../controller/User.js";
import { sendError } from "./route.js";

const UserObj = new UserController();

export function routeLogin(app) {
    app.route("/api/login")
        .post(async (req, res) => {
            const body = req.body;
            const response = await UserObj.createUser(body);
            if (response.error) {
                sendError(response.error, res, req);
                return;
            }

            res.status(response.status).send(response.msg);
        })
}