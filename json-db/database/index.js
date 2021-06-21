const fs = require("fs");

let cities = fs.readFileSync("./database/cities.json");
let users = fs.readFileSync("./database/users.json");
let branches = fs.readFileSync("./database/branches.json");
let cargoCompanies = fs.readFileSync("./database/cargo_companies.json");

exports.DatabaseJson = {
    cities: cities,
    users: users,
    branches: branches,
    cargoCompanies: cargoCompanies,
};
