const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validatetestPingCars = (req, res, next) => {
  // Validasi sederhana (misalnya hanya membiarkan request dengan method GET)
  if (req.method === "GET") {
    return next();
  }
  return res.status(405).json({ message: "Method not allowed" });
};

exports.validateCars = (req, res, next) => {
  // Validasi sederhana (misalnya hanya membiarkan request dengan method GET)
  if (req.method === "GET") {
    return next();
  }
  return res.status(405).json({ message: "Method not allowed" });
};

exports.validateCarsId = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateCar = (req, res, next) => {
  const parsedBody = {
    ...req.body,
    rentPerDay: req.body.rentPerDay ? parseFloat(req.body.rentPerDay) : null,
    capacity: req.body.capacity ? parseFloat(req.body.capacity) : null,
    available: req.body.available ? req.body.available === "true" : null,
    year: req.body.year ? parseInt(req.body.year, 10) : null,
  };

  // Validation body schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    image: z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()).optional().nullable(),
    specs: z.array(z.string()).optional().nullable(),
  });

  // Validate
  const result = validateBody.safeParse(parsedBody);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  req.body = parsedBody;

  // The file is not required
  const validateFileBody = z
    .object({
      profilePicture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  // zod validation for params
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  // Parse body values to correct types
  const parsedBody = {
    ...req.body,
    rentPerDay: req.body.rentPerDay ? parseFloat(req.body.rentPerDay) : null,
    capacity: req.body.capacity ? parseFloat(req.body.capacity) : null,
    available: req.body.available ? req.body.available === "true" : null,
    year: req.body.year ? parseInt(req.body.year, 10) : null,
  };

  // Validation body schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    image: z.string().optional(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()).optional().nullable(),
    specs: z.array(z.string()).optional().nullable(),
  });

  // Validate body
  const resultValidateBody = validateBody.safeParse(parsedBody);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  req.body = parsedBody;

  // Validasi file upload jika ada
  const validateFileBody = z
    .object({
      profilePicture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateDeleteCar = (req, res, next) => {
  const validateParams = z.object({ id: z.string() });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
