import restaurantProfileRepository from "../repositories/restaurantProfile.repository.js";
import uploadService from "./upload.service.js";

import { toRestaurantProfileResponse } from "../transformers/restaurantProfile.transformer.js";

class RestaurantProfileService {
  /**
   * Get Restaurant Profile
   */
  async getProfile(ownerId) {
    const restaurant =
      await restaurantProfileRepository.findByOwnerOrFail(ownerId);

    return toRestaurantProfileResponse(restaurant);
  }

  /**
   * Update Restaurant Profile
   */
  async updateProfile(ownerId, body) {
    await restaurantProfileRepository.findByOwnerOrFail(ownerId);

    const restaurant = await restaurantProfileRepository.updateProfile(
      ownerId,
      body,
    );

    return toRestaurantProfileResponse(restaurant);
  }

  /**
   * Update Restaurant Logo
   */
  async updateLogo(ownerId, file) {
    const restaurant =
      await restaurantProfileRepository.findByOwnerOrFail(ownerId);

    if (restaurant.logo?.publicId) {
      await uploadService.deleteImage(restaurant.logo.publicId);
    }

    const logo = await uploadService.uploadImage(file, "restaurants/logos");

    const updatedRestaurant = await restaurantProfileRepository.updateImages(
      ownerId,
      {
        logo,
      },
    );

    return toRestaurantProfileResponse(updatedRestaurant);
  }

  /**
   * Update Restaurant Cover Image
   */
  async updateCover(ownerId, file) {
    const restaurant =
      await restaurantProfileRepository.findByOwnerOrFail(ownerId);

    if (restaurant.coverImage?.publicId) {
      await uploadService.deleteImage(restaurant.coverImage.publicId);
    }

    const coverImage = await uploadService.uploadImage(
      file,
      "restaurants/covers",
    );

    const updatedRestaurant = await restaurantProfileRepository.updateImages(
      ownerId,
      {
        coverImage,
      },
    );

    return toRestaurantProfileResponse(updatedRestaurant);
  }
}

export default new RestaurantProfileService();
