const { createToken, checkToken } = require("../function");

function login(req, res) {
    let username = req.params.username;
    let password = req.params.password;
    let token = req.params.token;

    createToken(username, password, token, function (data) {
        let statusCode = data.status ? 200 : 400;

        res.status(statusCode).send(data);
    });
}

function cities(req, res) {
    res.send("ok s");
}

function authMiddleware(req, res, next) {
    let auth = req.headers.authorization.split(" ");

    if (auth.length != 2) {
        response.status(400).send({
            status: false,
            err: "Auth Error",
        });
        return;
    }

    let prefix = auth[0];
    let token = auth[1];

    if (prefix != "Bearer") {
        response.status(400).send({
            status: false,
            err: "Auth Request Error",
        });
        return;
    }

    checkToken(token, function (data) {
        if (data.status) {
            next();
            return;
        }
        res.status(200).send(data);
    });
}

exports.handlers = {
    login: login,
    cities: cities,
    authMiddleware: authMiddleware,
};
