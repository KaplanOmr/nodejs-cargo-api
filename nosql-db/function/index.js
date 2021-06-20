const jwt = require("jsonwebtoken");
const { globalConfig } = require("../config");
const { Models } = require("../database");
const fs = require("fs");

exports.createToken = function (username, password, token, cb) {
    let respond = {
        status: false,
    };

    Models.Users.findOne({
        username: username,
        password: password,
        token: token,
    })
        .then(function (data) {
            if (data) {
                respond.status = true;
                let privateKey = fs
                    .readFileSync(globalConfig.jwt.privateKey)
                    .toString();
                let token = jwt.sign(
                    {
                        username: data.username,
                    },
                    privateKey,
                    {
                        algorithm: "RS256",
                        expiresIn: "1h",
                    }
                );

                respond.token = token;
            } else {
                respond.err = "User invalid";
            }

            cb(respond);
        })
        .catch(function (err) {
            respond.err = "Server error";
            console.log(err);
            cb(respond);
        });
};

exports.checkToken = function (token, cb) {
    let respond = {
        status: false,
    };
    let publicKey = fs.readFileSync(globalConfig.jwt.publicKey).toString();
    jwt.verify(token, publicKey, { algorithms: "RS256" }, function (err, data) {
        if (err) {
            respond.err = "Token invalid";
            cb(respond);
            return;
        }
        respond.status = true;
        cb(respond);
    });
};

exports.getCities = function (cb) {
    let respond = {
        status: false,
    };

    Models.Cities.find({})
        .select(["-_id", "-__v"])
        .then(function (data) {
            respond.status = true;
            respond.data = data;
            cb(respond);
        })
        .catch(function (err) {
            console.log(err);
            respond.err = "Database error";
            cb(respond);
        });
};

exports.getCargoCompanies = function (cb) {
    let respond = {
        status: false,
    };

    Models.CargoCompanies.find({})
        .select(["-_id", "-__v"])
        .then(function (data) {
            respond.status = true;
            respond.data = data;
            cb(respond);
        })
        .catch(function (err) {
            console.log(err);
            respond.err = "Database error";
            cb(respond);
        });
};
