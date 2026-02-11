import { Router } from 'express';
import {
  getPackages,
  getPackageById,
  createPackage,
} from '../controllers/packageController';

const router = Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', createPackage);

export default router;
