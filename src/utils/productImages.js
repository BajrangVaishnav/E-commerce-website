export default function getProductImages(product) {
  let images = product?.image || product?.images;
  if (typeof images === "string") {
    try {
      images = JSON.parse(images);
    } catch {
      images = [images];
    }
  }

  if (!Array.isArray(images)) images = images ? [images] : [];
  return images.filter((image) => typeof image === "string");
}
