import { Router } from 'express';
import { getBookings, createBooking } from '../controllers/bookingController';
import { apiLimiter, writeLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/', apiLimiter, getBookings);
router.post('/', writeLimiter, createBooking);

export default router;
