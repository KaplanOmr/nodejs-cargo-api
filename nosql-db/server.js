const express = require("express");
const { globalConfig } = require("./config");
const { handlers } = require("./handler");

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.get("/", handlers.main);

app.listen(globalConfig.serverPort, () => {
    console.log("Server on air port:" + globalConfig.serverPort);
});
