import express from 'express';
import postController from '../controller/postController.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const postRouter = express.Router();

// Ensure 'uploads' directory exists
const ensureUploadsDir = () => {
  const dir = 'uploads/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDir();
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

postRouter.post('/create', upload.single('image'), postController.createPost);
postRouter.get('/', postController.getPosts);
postRouter.post('/like/:postId', postController.likePost);
postRouter.post('/comment/:postId', postController.commentPost);

export default postRouter;
