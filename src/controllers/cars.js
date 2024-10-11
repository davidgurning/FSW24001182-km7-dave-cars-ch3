const carsService = require("../services/cars");
const { successResponse } = require("../utils/response.js");
const { NotFoundError } = require("../utils/request");

exports.gettestPingCars = (req, res) => {
  // Memanggil service untuk mendapatkan data
  const data = carsService.gettestPingCars();

  // Mengirim response yang sukses dengan format json
  successResponse(res, data);
};

exports.getCars = (req, res, next) => {
  const data = carsService.getCars();

  successResponse(res, data);
};

exports.getCarsId = (req, res, next) => {
  const { id } = req.params;
  const data = carsService.getCarsId(id);

  successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
  try {
    // Langsung menggunakan req.body, karena requestBody sudah diproses di middleware
    const data = await carsService.createCar(req.body, req.files);

    // Mengirimkan respons sukses
    successResponse(res, data);
  } catch (error) {
    // Jika terjadi error, lempar ke error handler
    next(error);
  }
};

exports.updateCar = async (req, res, next) => {
  const { id } = req.params;
  const data = carsService.updateCar(id, req.body);
  successResponse(res, data);
};

exports.deleteCar = (req, res, next) => {
  const { id } = req.params;
  const data = carsService.deleteCar(id);
  successResponse(res, data);
};
