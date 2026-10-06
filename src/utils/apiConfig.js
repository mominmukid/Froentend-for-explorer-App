/**
 * Centralized API configuration with sensible fallbacks
 */
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/v1";
export const UPLOAD_URL = import.meta.env.VITE_BASE_URL_upload || BASE_URL;

export default {
  BASE_URL,
  UPLOAD_URL,
};
