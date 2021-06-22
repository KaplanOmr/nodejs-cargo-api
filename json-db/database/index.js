const fs = require("fs");

let cities = fs.readFileSync("./database/cities.json");
let users = fs.readFileSync("./database/users.json");
let branches = fs.readFileSync("./database/branches.json");
let cargoCompanies = fs.readFileSync("./database/cargo_companies.json");
exports.DatabaseJson = {
    cities: JSON.parse(cities.toString()),
    users: JSON.parse(users.toString()),
    branches: JSON.parse(branches.toString()),
    cargoCompanies: JSON.parse(cargoCompanies.toString()),
};
