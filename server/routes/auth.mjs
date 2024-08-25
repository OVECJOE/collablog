import { Router } from 'express';
import passport from 'passport';
import handlers from '../controllers/auth/index.mjs';

// Create a new router
const router = Router();

// Register routes
router.post('/register', handlers.register);
router.post('/login', handlers.login);
router.put('/verify-account', handlers.verifyAccount);
router.get('/users', passport.authenticate('jwt', { session: false }), handlers.getUsers);
router.get('/current', passport.authenticate('jwt', { session: false }), handlers.getCurrentSession);

// Export the router
export default router;
