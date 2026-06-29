import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const validate = (schema) =>
  asyncHandler(async (req, res, next) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = validatedData.body;
      req.params = validatedData.params ?? req.params;
      req.query = validatedData.query ?? req.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          "Validation failed",
          errors
        );
      }

      throw error;
    }
  });

export default validate;