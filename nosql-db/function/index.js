const { JsonWebTokenError } = require("jsonwebtoken");
const { Models } = require("../database");

exports.createToken = function (username, password, token, cb) {
    Models.Users.findOne(
        {
            username: username,
            password: password,
            token: token,
        },
        function (err, data) {
            cb(err, data);
        }
    );
};
