import React, { useState } from 'react';
import { CreatePostService } from '../services/CreatePostService';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);

    try {
      const postData = {
        title,
        content,
        image,
      };

      await CreatePostService.createPost(postData);

      // Clear the form
      setTitle('');
      setContent('');
      setImage(null);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-5 bg-dark"
      style={{
        maxWidth: '800px',
        padding: '20px',
        marginLeft: '225px',
        marginRight: 'auto',
      }}
    >
      <div className="row">
        <div className="col-sm-8">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="text"
                placeholder="Enter Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-success mt-3"
              disabled={loading}
            >
              {loading ? 'Creating Post...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
