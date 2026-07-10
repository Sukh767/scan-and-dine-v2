import crypto from "crypto";

import restaurantRepository from "../repositories/restaurant.repository.js";
import authRepository from "../repositories/auth.repository.js";

import uploadService from "./upload.service.js";
import mailService from "./mail.service.js";

import { toRestaurantResponse } from "../transformers/restaurant.transformer.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, RESTAURANT_MESSAGES } from "../constants/index.js";

class RestaurantService {
  /**
   * Generate unique restaurant slug
   */
  async generateUniqueSlug(name) {
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    let slug = baseSlug;

    while (await restaurantRepository.slugExists(slug)) {
      const suffix = crypto.randomBytes(2).toString("hex");

      slug = `${baseSlug}-${suffix}`;
    }

    return slug;
  }

  /**
   * Rollback uploaded images
   */
  async rollbackUploads(images = []) {
    for (const image of images) {
      if (!image?.publicId) continue;

      try {
        await uploadService.deleteImage(image.publicId);
      } catch (error) {
        console.error("Cloudinary rollback failed:", error.message);
      }
    }
  }

  /**
   * Parse JSON payload safely
   */
  parseJson(value) {
    if (!value) {
      return undefined;
    }

    if (typeof value !== "string") {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid JSON payload.");
    }
  }

  /**
   * Normalize array values from multipart/form-data
   */
  normalizeArray(value) {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  /**
   * Create restaurant
   */
  async createRestaurant(ownerId, body, files) {
    const existingRestaurant = await restaurantRepository.findByOwner(ownerId);

    if (existingRestaurant) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        RESTAURANT_MESSAGES.ALREADY_EXISTS,
      );
    }

    const owner = await authRepository.findUserById(ownerId);

    if (!owner) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Owner not found.");
    }

    const existingEmail = await restaurantRepository.findByEmail(body.email);

    if (existingEmail) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        RESTAURANT_MESSAGES.EMAIL_EXISTS,
      );
    }

    const existingPhone = await restaurantRepository.findByPhone(body.phone);

    if (existingPhone) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        RESTAURANT_MESSAGES.PHONE_EXISTS,
      );
    }

    if (!files?.logo?.[0]) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        RESTAURANT_MESSAGES.LOGO_REQUIRED,
      );
    }

    const uploadedImages = [];
    let restaurant = null;

    try {
      const address = this.parseJson(body.address);

      const operatingHours = this.parseJson(body.operatingHours);

      const socialMedia = this.parseJson(body.socialMedia);

      const logo = await uploadService.uploadImage(
        files.logo[0],
        "restaurants/logos",
      );

      uploadedImages.push(logo);

      let coverImage = null;

      let gallery = [];

      if (files?.gallery?.length) {
        for (const image of files.gallery) {
          const uploaded = await uploadService.uploadImage(
            image,
            "restaurants/gallery",
          );

          gallery.push(uploaded);

          uploadedImages.push(uploaded);
        }
      }

      if (files?.coverImage?.[0]) {
        coverImage = await uploadService.uploadImage(
          files.coverImage[0],
          "restaurants/covers",
        );

        uploadedImages.push(coverImage);
      }

      const slug = await this.generateUniqueSlug(body.name);

      restaurant = await restaurantRepository.create({
        ownerId,

        name: body.name,
        email: body.email,
        phone: body.phone,

        description: body.description,

        website: body.website?.trim(),

        priceRange: body.priceRange,

        socialMedia,

        cuisineTypes: this.normalizeArray(body.cuisineTypes),

        facilities: this.normalizeArray(body.facilities),

        address,
        operatingHours,

        slug,
        logo,
        coverImage,
        gallery,
      });

      /**
       * Send onboarding email
       * Email failure should not fail
       * restaurant creation.
       */
      try {
        await mailService.sendRestaurantSubmittedEmail({
          to: owner.email,
          data: {
            ownerName: owner.name || "Restaurant Owner",

            restaurantName: restaurant.name,
          },
        });
      } catch (error) {
        console.error("Restaurant onboarding email failed:", error.message);
      }

      return toRestaurantResponse(restaurant);
    } catch (error) {
      if (!restaurant) {
        await this.rollbackUploads(uploadedImages);
      }

      console.error(error);

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESTAURANT_MESSAGES.CREATE_FAILED,
      );
    }
  }
}

export default new RestaurantService();
