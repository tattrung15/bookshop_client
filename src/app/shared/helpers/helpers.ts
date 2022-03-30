export const buildImageSrc = (imageUrl: string) => {
  const baseUrl = new URL(process.env.REACT_APP_BASE_API_URL || "");
  const srcImage = imageUrl.startsWith("http")
    ? imageUrl
    : `${baseUrl.origin}${imageUrl}`;
  return srcImage;
};
