import { Router } from 'express';
import handlers from '../controllers/posts/index.mjs';

const router = Router();

router.get('/', handlers.getAllPosts);
router.post('/', handlers.createPost);
router.get('/:id', handlers.getPost);
router.put('/:id', handlers.updatePost);
router.delete('/:id', handlers.deletePost);

export default router;
