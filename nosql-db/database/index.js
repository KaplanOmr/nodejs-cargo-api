const mongoose = require("mongoose");
const { globalConfig } = require("../config");

mongoose.connect(globalConfig.conString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CargoCampany = new Schema({
    id: ObjectId,
    slug: String,
    name: String,
});

const City = new Schema({
    id: ObjectId,
    slug: String,
    name: String,
});

const Branch = new Schema({
    id: ObjectId,
    cargo: String,
    city: String,
    name: String,
    address: String,
    phone: String,
});

const User = new Schema({
    id: ObjectId,
    username: String,
    password: String,
    token: String,
});

const CargoCompanyModel = mongoose.model("CargoCompanies", CargoCampany);
const CityModel = mongoose.model("Cities", City);
const BranchModel = mongoose.model("Branches", Branch);
const UserModel = mongoose.model("Users", User);

exports.Models = {
    Cities: CityModel,
    Branches: BranchModel,
    Users: UserModel,
    CargoCompanies: CargoCompanyModel,
};
