import { Router } from 'express';
import {
  getBartenders,
  getBartenderById,
  createBartender,
  updateBartender,
  publishBartender,
  addBartenderService,
  createBartenderBooking,
  addBartenderReview,
} from '../controllers/bartenderController';
import { apiLimiter, writeLimiter } from '../middleware/rateLimiter';

const router = Router();

// Bartender routes
router.get('/', apiLimiter, getBartenders);
router.get('/:id', apiLimiter, getBartenderById);
router.post('/', writeLimiter, createBartender);
router.put('/:id', writeLimiter, updateBartender);
router.post('/:id/publish', writeLimiter, publishBartender);

// Service routes
router.post('/services', writeLimiter, addBartenderService);

// Booking routes
router.post('/bookings', writeLimiter, createBartenderBooking);

// Review routes
router.post('/reviews', writeLimiter, addBartenderReview);

export default router;
