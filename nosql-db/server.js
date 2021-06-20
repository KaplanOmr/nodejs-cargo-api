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
app.get(
    "/branches/cargo-city/:cargo/:city",
    handlers.authMiddleware,
    handlers.branchesCargoCity
);
app.get(
    "/branches/cargo/:cargo",
    handlers.authMiddleware,
    handlers.branchesCargo
);
app.get("/branches/city/:city", handlers.authMiddleware, handlers.branchesCity);

app.listen(globalConfig.serverPort, () => {
    console.log("Server on air. Port:" + globalConfig.serverPort);
});
