import Post from '../schema/postSchema.js';

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      title,
      content,
      image: imageUrl, // Store image URL
    });

    await newPost.save();

    res.status(201).json({
      status: 'success',
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({
      STATUS: 'SUCCESS',
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      STATUS: 'FAILED',
    });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.likes += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const commentPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ text });
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  createPost,
  getPosts,
  likePost,
  commentPost,
};
