import { Router } from 'express';
import { submitEmissions, getHistory, getFactors } from '../controllers/carbon.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/submit', authenticate, submitEmissions);
router.get('/history', authenticate, getHistory);
router.get('/factors', getFactors);

export default router;
