import cloudinary from "../config/cloudinary.js";

import ApiError from "../utils/ApiError.js";
import deleteLocalFile from "../utils/deleteLocalFile.js";

import {
  HTTP_STATUS,
} from "../constants/index.js";

class UploadService {
  /**
   * Upload image to Cloudinary
   */
  async uploadImage(file, folder) {
    if (!file) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Image is required."
      );
    }

    try {
      const result = await cloudinary.uploader.upload(
        file.path,
        {
          folder,
          resource_type: "image",
        }
      );

      return {
        publicId: result.public_id,
        url: result.secure_url,
      };
    } finally {
      /**
       * Always delete temporary file
       */
      await deleteLocalFile(file.path);
    }
  }

  /**
   * Delete image
   */
  async deleteImage(publicId) {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  }
}

export default new UploadService();