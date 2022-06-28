import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      })
      .end(file); // file from buffer
  });
};

export default streamUploadToCloudinary;
