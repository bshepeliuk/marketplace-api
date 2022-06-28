import streamUploadToCloudinary from '../utils/streamUploadToCloudinary';

const CloudinaryService = {
  async saveImg(image) {
    const buffer = await image.toBuffer();

    return streamUploadToCloudinary(buffer);
  },
};

export default CloudinaryService;
