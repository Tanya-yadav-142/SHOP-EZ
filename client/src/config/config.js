// client/src/config/config.js

export const apiURL = "https://shop-ez-tffy.onrender.com";

// ✅ Universal Image Resolver (works for products/categories/customize)
export const imageURL = (imgPath, type) => {
  if (!imgPath) return "";

  // already full URL (Unsplash images)
  if (imgPath.startsWith("http")) {
    return imgPath;
  }

  // local uploaded images
  return `${apiURL}/uploads/${type}/${imgPath}`;
};