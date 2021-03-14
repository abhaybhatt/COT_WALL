import express from 'express';
import {getPosts,createPost,updatePost,deletePost,likePost} from "../controllers/posts.js";
const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/',getPosts);
router.post('/',auth,createPost);
router.patch('/:id',auth, updatePost);
router.patch('/:id/likePost',auth, likePost);
router.delete('/:id',auth, deletePost);

export default router;
