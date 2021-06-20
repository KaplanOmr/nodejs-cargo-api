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

app.post("/login", handlers.login);

app.get("/cities", handlers.authMiddleware, handlers.cities);
app.get("/cargo-companies", handlers.authMiddleware, handlers.cargoCompanies);

app.listen(globalConfig.serverPort, () => {
    console.log("Server on air. Port:" + globalConfig.serverPort);
});
