import CloudinaryService from '../services/CloudinaryService';

const uploadImgToCloudinary = async (images) => {
  const urls = [];

  if (Array.isArray(images)) {
    for (const image of images) {
      const result = await CloudinaryService.saveImg(image);

      urls.push(result.url);
    }
  } else {
    const result = await CloudinaryService.saveImg(images);
    urls.push(result.url);
  }

  return urls;
};

export default uploadImgToCloudinary;
