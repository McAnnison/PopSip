import { Router } from 'express';
import {
  getPackages,
  getPackageById,
  createPackage,
} from '../controllers/packageController';
import { apiLimiter, writeLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/', apiLimiter, getPackages);
router.get('/:id', apiLimiter, getPackageById);
router.post('/', writeLimiter, createPackage);

export default router;
