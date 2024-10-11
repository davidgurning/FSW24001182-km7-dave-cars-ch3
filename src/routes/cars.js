const express = require("express");

const {
  validatetestPingCars,
  validateCars,
  validateCarsId,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCar,
} = require("../middleware/cars");

const {
  gettestPingCars,
  getCars,
  getCarsId,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/cars");

const router = express.Router();

router.get("/", validatetestPingCars, gettestPingCars);
router.get("/cars", validateCars, getCars);
router.get("/cars/:id", validateCarsId, getCarsId);
router.post("/cars", validateCreateCar, createCar);
router.put("/cars/:id", validateUpdateCar, updateCar);
router.delete("/cars/:id", validateDeleteCar, deleteCar);

module.exports = router;
