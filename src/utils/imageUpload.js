import axios from "axios";

const IMGUR_CLIENT_ID = "YOUR_IMGUR_CLIENT_ID";

export async function uploadImageToImgur(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axios.post("https://api.imgur.com/3/image", formData, {
    headers: {
      Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
    },
  });
  return response.data.data.link;
} 