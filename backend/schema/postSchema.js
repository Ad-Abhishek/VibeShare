import mongoose from 'mongoose';
import pkg from 'body-parser';
const { text, json } = pkg;

const post = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      text: String,
    },
  ],
});

const Post = mongoose.model('Post', post);

export default Post;
