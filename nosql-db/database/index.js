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

const CargoCampanies = new Schema({
    id: ObjectId,
    slug: String,
    name: String,
});

const Cities = new Schema({
    id: ObjectId,
    slug: String,
    name: String,
});

const CargoData = new Schema({
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

const CargoModel = mongoose.model("CargoModel", CargoCampanies);
const CitiesModel = mongoose.model("CitiesModel", Cities);
const CargoDataModel = mongoose.model("CargoDataModel", CargoData);
const UserModel = mongoose.model("UserModel", User);

exports.Models = {
    Cities: CitiesModel,
    CargoData: CargoDataModel,
    Users: UserModel,
    Cargo: CargoModel,
};
