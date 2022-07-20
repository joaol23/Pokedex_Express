import { UserController } from "../controller/User.js";

const UserObj = new UserController();

export function routeLogin(app) {
    app.route("/api/create-user")
        .post(async (req, res) => {
            try {
                await UserObj.createUser(req, res)
            } catch (err) {
                res.status(err.status).send({ msg: err.message });
            }
        })
    app.post("/api/login", async (req, res) => {
        try {
            await UserObj.validationUser(req, res)
        } catch (err) {
            res.status(err.status).send({ msg: err.message });
        }
    })
}
