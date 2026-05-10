import { Router } from 'express';
import { getCurrentScore, getScoreHistory, getBenchmark } from '../controllers/score.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/current', authenticate, getCurrentScore);
router.get('/history', authenticate, getScoreHistory);
router.get('/benchmark', authenticate, getBenchmark);

export default router;
