import axios from 'axios';

const REACT_APP_COMMENT_POST_URL = process.env.REACT_APP_COMMENT_POST_URL;

export class CommentService {
  static postComment = (id, comment) => {
    // Replace `:id` in the URL with the actual post ID
    const url = REACT_APP_COMMENT_POST_URL.replace(':id', id);
    return axios.post(url, { text: comment });
  };
}
