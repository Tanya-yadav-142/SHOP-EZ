// client/src/utils/imageHelper.js

const BACKEND_URL = "http://localhost:5000";

export const getImage = (imgPath, type = "") => {
  if (!imgPath) return "";

  // ✅ if already full internet URL (unsplash etc.)
  if (imgPath.startsWith("http")) {
    return imgPath;
  }

  // ✅ if backend already saved full path
  if (imgPath.startsWith("/uploads")) {
    return `${BACKEND_URL}${imgPath}`;
  }

  // ✅ fallback for old project paths
  return `${BACKEND_URL}/uploads/${type}/${imgPath}`;
};