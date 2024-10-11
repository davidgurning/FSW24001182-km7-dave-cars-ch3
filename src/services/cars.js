const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.gettestPingCars = () => {
  return { message: "ping successfully" };
};

exports.getCars = () => {
  const cars = carRepository.getCars();

  if (!cars) {
    throw new NotFoundError("No Cars data");
  }

  return cars;
};

exports.getCarsId = (id) => {
  const car = carRepository.getCarsId(id);
  if (!car) {
    throw new NotFoundError("Car is Not Found!");
  }

  return car;
};

exports.createCar = async (data, file) => {
  // Upload file to image kit
  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }
  return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
  const existingCar = carRepository.getCarsId(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  // Jika ada file baru yang diunggah
  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture); // Pastikan ada fungsi untuk mengupload gambar
  }

  const updatedCar = carRepository.updateCarId(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update car!"]);
  }

  return updatedCar;
};

exports.deleteCar = (id) => {
  const existingCar = carRepository.getCarsId(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  // if exist, we will delete the car data
  const deletedCar = carRepository.deleteCarId(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to delete car!"]);
  }

  return deletedCar;
};
