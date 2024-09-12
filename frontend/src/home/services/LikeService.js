import axios from 'axios';

const REACT_APP_LIKE_POST_URL = process.env.REACT_APP_LIKE_POST_URL;

export class LikeService {
  static likePost = (id) => {
    // Replace `:id` in the URL with the actual post ID
    const url = REACT_APP_LIKE_POST_URL.replace(':id', id);
    return axios.post(url);
  };
}
