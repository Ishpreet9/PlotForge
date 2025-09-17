import express from 'express';
import { generateFullStory, generateInitialChoices, generateNextChoices, generateSimilarIdeas, initialIdeas } from '../controllers/storyControllers.js';

const router = express.Router();

router.post('/initial-ideas', initialIdeas);
router.post('/similar-ideas', generateSimilarIdeas);
router.post('/initial-choices', generateInitialChoices);
router.post('/next-choices', generateNextChoices);
router.post('/full-story', generateFullStory);

export default router;