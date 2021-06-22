const {
    createToken,
    checkToken,
    getCities,
    getCargoCompanies,
    getBranchesCargoCity,
    getBranchesCargo,
    getBranchesCity,
} = require("../function");

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let token = req.body.token;

    createToken(username, password, token, function (data) {
        let statusCode = data.status ? 200 : 400;

        res.status(statusCode).send(data);
    });
}

function cities(req, res) {
    let cities = getCities();

    res.status(200).send({
        status: true,
        cities: cities,
    });
}
function cargoCompanies(req, res) {
    let getCargoCompanies = getCargoCompanies();

    res.status(200).send({
        status: true,
        cargo_companies: getCargoCompanies,
    });
}

function branchesCargoCity(req, res) {
    let cargo = req.params.cargo;
    let city = req.params.city;

    let respond = {
        status: false,
    };

    let data = getBranchesCargoCity(cargo, city);

    if (!data.length) {
        respond.err = "Branches empty";
        res.status(400).send(respond);
        return;
    }

    respond.status = true;
    respond.data = data;
    res.status(200).send(respond);
    return;
}

function branchesCargo(req, res) {
    let cargo = req.params.cargo;

    let respond = {
        status: false,
    };

    let data = getBranchesCargo(cargo);

    if (!data.length) {
        respond.err = "Cargo Branches empty";
        res.status(400).send(respond);
        return;
    }

    respond.status = true;
    respond.data = data;
    res.status(200).send(respond);
    return;
}

function branchesCity(req, res) {
    let city = req.params.city;

    let respond = {
        status: false,
    };

    let data = getBranchesCity(city);

    if (!data.length) {
        respond.err = "City branches empty";
        res.status(400).send(respond);
        return;
    }

    respond.status = true;
    respond.data = data;
    res.status(200).send(respond);
    return;
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
    cargoCompanies: cargoCompanies,
    branchesCargoCity: branchesCargoCity,
    branchesCargo: branchesCargo,
    branchesCity: branchesCity,
    authMiddleware: authMiddleware,
};
