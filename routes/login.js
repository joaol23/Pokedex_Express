import { createUser } from "../controller/user.js";

export function routeLogin(app) {
    app.route("/api/login")
        .post(async (req, res) => {
            const body = req.body;
            const response = await createUser(body);
            if (response.error) {
                res.sendStatus(response.error);
                return;
            }

            res.status(response.status).send(response.msg);
        })
}