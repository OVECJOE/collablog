import express from 'express';
import cors from 'cors';
import path from 'node:path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import passport from 'passport';
import './load-environment.mjs';
import mongoose from 'mongoose';
import setupPassport from './config/passport.mjs';
import auth from './routes/auth.mjs';
import posts from './routes/posts.mjs';

const app = express();
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`[server]: Collablog API running on port ${port}`);
});

// view engine setup
app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'pug');

// Setup middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(passport.initialize());
setupPassport(passport);

// Register routes
app.use('/api/auth', auth);
app.use('/api/posts', passport.authenticate('jwt', { session: false }), posts);

// Connect to database
mongoose
	.connect(process.env.ATLAS_URI)
	.then(({ connection }) => {
		console.log(`[server]: Connected to database on host ${connection.host}`);
	})
	.catch((err) => console.error(err));
