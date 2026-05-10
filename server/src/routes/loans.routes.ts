import { Router } from 'express';
import { listLoans, getEligibleLoans, getLoanById } from '../controllers/loans.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', listLoans);
router.get('/eligible', authenticate, getEligibleLoans);
router.get('/:id', getLoanById);

export default router;
