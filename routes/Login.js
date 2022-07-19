import { UserController } from "../controller/User.js";

const UserObj = new UserController();

export function routeLogin(app) {
    app.route("/api/login")
        .post(async (req, res) => {
            try {
                await UserObj.createUser(req, res)
            } catch (err) {
                res.status(err.status).send({ msg: err.message });
            }
        })
}
