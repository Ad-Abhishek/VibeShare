import axios from 'axios';

const REACT_APP_CREATE_POST_URL = process.env.REACT_APP_CREATE_POST_URL;

export class CreatePostService {
  static createPost = (postData) => {
    const { title, content, image } = postData;

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image); // image is the actual file object
    }

    return axios.post(REACT_APP_CREATE_POST_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file upload
      },
    });
  };
}
