import { api } from './api';

export const PROFILE_IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp';
export const PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export function getProfileImageFileError(file) {
  if (!file) {
    return 'Choose an image to upload.';
  }

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return 'Choose a JPEG, PNG, or WebP image.';
  }

  if (file.size > PROFILE_IMAGE_MAX_BYTES) {
    return 'Image must not exceed 5 MB.';
  }

  return '';
}

export function getProfileImageRequestError(error, fallback) {
  const responseMessage = error?.response?.data?.message;
  if (typeof responseMessage === 'string' && responseMessage) {
    return responseMessage;
  }

  if (!error?.response && (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error')) {
    return 'Cannot reach the HPH backend. Check that it is running and VITE_API_URL points to it, then retry.';
  }

  return error?.message || fallback;
}

export async function uploadProfileImage(endpoint, file) {
  const formData = new FormData();
  formData.append('image', file);
  return api.put(endpoint, formData);
}

export async function deleteProfileImage(endpoint) {
  return api.delete(endpoint);
}
