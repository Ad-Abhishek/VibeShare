import axios from 'axios';

const REACT_APP_GET_POSTS_URL = process.env.REACT_APP_GET_POSTS_URL;

export class HomeService {
  static getPosts = () => {
    return axios.get(REACT_APP_GET_POSTS_URL);
  };
}
