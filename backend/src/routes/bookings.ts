import { Router } from 'express';
import { getBookings, createBooking } from '../controllers/bookingController';

const router = Router();

router.get('/', getBookings);
router.post('/', createBooking);

export default router;
