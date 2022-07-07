import { createUser } from "../controller/user.js";

export function routeLogin(app) {
    app.route("/api/login")
        .post((req, res) => {
            const body = req.body;
            const response = createUser(body);
            if (response.error) {
                res.sendStatus(response.error);
                return;
            }

            res.send('Usuário criado com sucesso!');
        })
}