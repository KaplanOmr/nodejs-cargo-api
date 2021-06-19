const { Functions, createToken } = require("../function");

function main(request, response) {
    createToken(
        request.body.username,
        request.body.password,
        request.body.token,
        function (err, data) {
            if (err) {
                console.log(err);
                response.status(500).send({
                    status: false,
                });
                return;
            }

            if (data) {
                response.status(200).send(data);
                return;
            } else {
                response.status(400).send({
                    status: false,
                    err_msg: "User invalid",
                });
                return;
            }
        }
    );
}

exports.handlers = {
    main: main,
};
