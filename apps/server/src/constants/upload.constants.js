export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB

export const MAX_RESTAURANT_LOGO_SIZE = 5 * 1024 * 1024; // 5 MB

export const MAX_RESTAURANT_BANNER_SIZE = 8 * 1024 * 1024; // 8 MB

export const MAX_MENU_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export const FILE_UPLOAD_LIMITS = {
  maxFileSize: MAX_MENU_IMAGE_SIZE,
  allowedTypes: ALLOWED_IMAGE_TYPES,
};
