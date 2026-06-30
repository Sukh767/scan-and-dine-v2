import fs from "fs";
import path from "path";
import multer from "multer";

import ApiError from "../utils/ApiError.js";

import {
  HTTP_STATUS,
  ALLOWED_IMAGE_TYPES,
} from "../constants/index.js";

/**
 * Ensure uploads directory exists
 */
const uploadDir = path.resolve("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

/**
 * Multer Storage
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },

  filename(req, file, cb) {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

/**
 * File Filter
 */
const fileFilter = (req, file, cb) => {
  if (
    !ALLOWED_IMAGE_TYPES.includes(file.mimetype)
  ) {
    return cb(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only JPG, PNG and WEBP images are allowed."
      )
    );
  }

  cb(null, true);
};

/**
 * Upload Factory
 */
export const uploadSingle = ({
  fieldName,
  maxSize,
}) =>
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(fieldName);