const fs = require("fs");
const path = require("path");
const cars = require("../../data/cars.json");
const carsFilePath = path.join(__dirname, "../../data/cars.json");
const { v4: uuidv4 } = require("uuid");
const { NotFoundError } = require("../utils/request");

exports.getCars = () => {
  const car = cars;

  return car;
};

exports.getCarsId = (id) => {
  const car = cars.find((car) => car.id == id);
  return car;
};

exports.createCar = (data) => {
  // Find the max index to defnine the new data id
  const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));

  const newCar = {
    id: uuidv4(),
    ...data,
  };

  cars.push(newCar);

  // Save the latest data to json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return newCar;
};

exports.updateCarId = (id, data) => {
  const car = cars.find((car) => car.id === id);
  if (!car) {
    throw new NotFoundError("Car is Not Found!"); // Lemparkan NotFoundError jika tidak ditemukan
  }

  // Update data mobil
  Object.assign(car, data);

  // Simpan kembali data ke file JSON
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return car;
};

exports.deleteCarId = (id) => {
  // Find index
  const carIndex = cars.findIndex((car) => car.id == id);

  if (carIndex < 0) {
    // If no index found
    return null;
  }

  const deletedCar = cars.splice(carIndex, 1);

  // Update the json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");
  return deletedCar;
};
