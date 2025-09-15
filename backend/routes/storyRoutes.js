import express from 'express';
import { generateSimilarIdeas, initialIdeas } from '../controllers/storyControllers.js';

const router = express.Router();

router.post('/initial-ideas', initialIdeas);
router.post('/similar-ideas', generateSimilarIdeas);

export default router;