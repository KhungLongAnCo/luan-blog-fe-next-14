export const getImagePath = (endpoint: string) => {
  if (endpoint?.includes("http")) {
    return endpoint;
  }
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${endpoint}`;
};
