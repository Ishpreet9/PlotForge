import express from 'express';
import { initialIdeas } from '../controllers/storyControllers.js';

const router = express.Router();

router.post('/initial-ideas', initialIdeas);

export default router;