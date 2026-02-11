import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

// Get all packages
export const getPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM packages');
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching packages',
    });
  }
};

// Get package by ID
export const getPackageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM packages WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Package not found',
      });
      return;
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching package',
    });
  }
};

// Create package
export const createPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, duration } = req.body;

    const [result] = await pool.query(
      'INSERT INTO packages (name, description, price, duration) VALUES (?, ?, ?, ?)',
      [name, description, price, duration]
    );

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: { id: (result as any).insertId },
    });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating package',
    });
  }
};
