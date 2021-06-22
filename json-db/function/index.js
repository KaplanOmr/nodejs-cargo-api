const { readFileSync } = require("fs");
const { globalConfig } = require("../config");
const { DatabaseJson } = require("../database");
const jwt = require("jsonwebtoken");

exports.createToken = function (username, password, token, cb) {
    let respond = {
        status: false,
    };

    let users = DatabaseJson.users;

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (
            element.username == username &&
            element.password == password &&
            element.token == token
        ) {
            respond.status = true;
            let privateKey = readFileSync(
                globalConfig.jwt.privateKey
            ).toString();
            let token = jwt.sign({ username: username }, privateKey, {
                algorithm: "RS256",
                expiresIn: "1h",
            });
            respond.token = token;

            cb(respond);
            return;
        }
    }

    respond.err = "User invalid";
    cb(respond);
    return;
};

exports.checkToken = function (token, cb) {
    let respond = {
        status: false,
    };
    let publicKey = readFileSync(globalConfig.jwt.publicKey).toString();
    jwt.verify(token, publicKey, { algorithms: "RS256" }, function (err, data) {
        if (err) {
            console.log(err);
            respond.err = "Token error";
            cb(respond);
            return;
        }
        respond.status = true;
        cb(respond);
    });
};

exports.getCities = function () {
    return DatabaseJson.cities;
};
exports.getCargoCompanies = function () {
    return DatabaseJson.cargoCompanies;
};
exports.getBranchesCargoCity = function (cargo, city) {
    let respond = [];
    let data = DatabaseJson.branches;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        if (element.cargo == cargo && element.city == city) {
            respond.push(element);
        }
    }

    return respond;
};

exports.getBranchesCargo = function (cargo) {
    let respond = [];
    let data = DatabaseJson.branches;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        if (element.cargo == cargo) {
            respond.push(element);
        }
    }

    return respond;
};

exports.getBranchesCity = function (city) {
    let respond = [];
    let data = DatabaseJson.branches;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        if (element.city == city) {
            respond.push(element);
        }
    }

    return respond;
};
