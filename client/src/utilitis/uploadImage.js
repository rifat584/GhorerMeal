import axios from "axios";

const uploadImage = async (image) => {
  const imageFile = image[0];
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const photoUpload = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    const photo = photoUpload.data.data.display_url;

    return photo;
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
