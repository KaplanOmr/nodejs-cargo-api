const {
    Functions,
    createToken,
    checkToken,
    getCities,
    getCargoCompanies,
} = require("../function");

function login(request, response) {
    createToken(
        request.body.username,
        request.body.password,
        request.body.token,
        function (data) {
            let statusCode = 200;

            if (data.err) {
                statusCode = 500;
            } else if (!data.status) {
                statusCode = 400;
            }

            response.status(statusCode).send(data);
            return;
        }
    );
}

function cities(request, response) {
    getCities(function (data) {
        let statusCode = data.status ? 200 : 400;
        response.status(statusCode).send(data);
    });
}
function cargoCompanies(request, response) {
    getCargoCompanies(function (data) {
        let statusCode = data.status ? 200 : 400;
        response.status(statusCode).send(data);
    });
}

function authMiddleware(request, response, next) {
    let auth = request.headers.authorization.split(" ");

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

        response.status(400).send(data);
        return;
    });
}

exports.handlers = {
    login: login,
    cities: cities,
    cargoCompanies: cargoCompanies,
    authMiddleware: authMiddleware,
};
