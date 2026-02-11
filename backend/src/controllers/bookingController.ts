import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

// Get all bookings
export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM bookings');
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
    });
  }
};

// Create booking
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer_name, customer_email, package_id, event_date, status } = req.body;

    const [result] = await pool.query(
      'INSERT INTO bookings (customer_name, customer_email, package_id, event_date, status) VALUES (?, ?, ?, ?, ?)',
      [customer_name, customer_email, package_id, event_date, status || 'pending']
    );

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { id: (result as any).insertId },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
    });
  }
};
