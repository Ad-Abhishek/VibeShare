import React, { useState, useEffect } from 'react';
import { HomeService } from '../services/HomeService';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaPaperPlane } from 'react-icons/fa';
import { LikeService } from '../services/LikeService';
import { CommentService } from '../services/CommentService';

const Home = () => {
  const BASE_URL = process.env.REACT_APP_BASE_SERVER_URL;

  const [likes, setLikes] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [state, setState] = useState({
    post: [],
    loading: false,
    error: '',
  });

  const handleLike = async (postId) => {
    setState({
      ...state,
      loading: true,
    });
    try {
      await LikeService.likePost(postId);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setState({
        ...state,
        loading: false,
      });
      setLikes(likes + 1);
    }
  };

  const handleComment = async (postId) => {
    if (commentText.trim() === '') return; // Prevent posting empty comments

    setState({
      ...state,
      loading: true,
    });
    try {
      console.log('comment text: ', commentText);
      await CommentService.postComment(postId, commentText);

      setCommentText(''); // Clear the input field after posting
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setState({
        ...state,
        loading: false,
      });
    }
  };

  useEffect(() => {
    const getPosts = async (req, res) => {
      try {
        setState({
          ...state,
          loading: true,
        });
        let post = await HomeService.getPosts();
        setState({
          ...state,
          post: post.data.data,
          loading: false,
        });
      } catch (error) {
        res.status(500).json({
          STATUS: 'FAIL',
          error: error.message,
        });
      }
    };

    getPosts();
  }, [likes, commentText]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-10 justify-content-start">
            {state?.post?.map((st) => (
              <Card style={{ width: '48rem' }} key={st._id}>
                <Card.Img variant="top" src={`${BASE_URL}${st.image}`} />
                <Card.Body>
                  <Card.Title>{st.title}</Card.Title>
                  <Card.Text>{st.content}</Card.Text>

                  <div>Likes: {st.likes}</div>
                  <Button variant="primary" onClick={(e) => handleLike(st._id)}>
                    Like
                  </Button>

                  <div className="mt-2">Comments: {st.comments.length}</div>
                  {st.comments.map((cmt) => (
                    <div key={cmt._id} className="text-success">
                      <p>{cmt.text}</p>
                    </div>
                  ))}

                  <InputGroup className="mb-3 mt-3">
                    <Form.Control
                      placeholder="Write a comment..."
                      aria-label="Write a comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleComment(st._id)}
                      disabled={state.loading}
                    >
                      <FaPaperPlane />
                    </Button>
                  </InputGroup>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
