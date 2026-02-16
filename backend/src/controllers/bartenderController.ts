import { Request, Response } from 'express';
import db from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Get all published bartenders
export const getBartenders = async (req: Request, res: Response) => {
  try {
    const { location, specialties, minRating, maxPrice } = req.query;
    
    let query = `
      SELECT 
        b.*,
        u.name,
        u.email,
        COUNT(DISTINCT br.id) as review_count
      FROM bartenders b
      JOIN users u ON b.user_id = u.id
      LEFT JOIN bartender_reviews br ON b.id = br.bartender_id
      WHERE b.published = true
    `;
    
    const params: any[] = [];
    
    if (location) {
      query += ' AND b.location LIKE ?';
      params.push(`%${location}%`);
    }
    
    if (specialties) {
      query += ' AND b.specialties LIKE ?';
      params.push(`%${specialties}%`);
    }
    
    if (minRating) {
      query += ' AND b.rating >= ?';
      params.push(parseFloat(minRating as string));
    }
    
    if (maxPrice) {
      query += ' AND b.hourly_rate <= ?';
      params.push(parseFloat(maxPrice as string));
    }
    
    query += ' GROUP BY b.id ORDER BY b.rating DESC, b.total_bookings DESC';
    
    const [bartenders] = await db.query<RowDataPacket[]>(query, params);
    
    res.json({
      success: true,
      count: bartenders.length,
      data: bartenders,
    });
  } catch (error) {
    console.error('Error fetching bartenders:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bartenders',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get bartender by ID with full details
export const getBartenderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Get bartender details
    const [bartenders] = await db.query<RowDataPacket[]>(
      `SELECT 
        b.*,
        u.name,
        u.email
      FROM bartenders b
      JOIN users u ON b.user_id = u.id
      WHERE b.id = ? AND b.published = true`,
      [id]
    );
    
    if (bartenders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bartender not found',
      });
    }
    
    const bartender = bartenders[0];
    
    // Get services
    const [services] = await db.query<RowDataPacket[]>(
      'SELECT * FROM bartender_services WHERE bartender_id = ?',
      [id]
    );
    
    // Get reviews
    const [reviews] = await db.query<RowDataPacket[]>(
      `SELECT * FROM bartender_reviews 
       WHERE bartender_id = ? 
       ORDER BY created_at DESC 
       LIMIT 10`,
      [id]
    );
    
    // Get portfolio images
    const [portfolio] = await db.query<RowDataPacket[]>(
      `SELECT * FROM bartender_portfolio 
       WHERE bartender_id = ? 
       ORDER BY display_order ASC`,
      [id]
    );
    
    res.json({
      success: true,
      data: {
        ...bartender,
        services,
        reviews,
        portfolio,
      },
    });
  } catch (error) {
    console.error('Error fetching bartender:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bartender details',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Create/register new bartender profile
export const createBartender = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      business_name,
      bio,
      experience_years,
      specialties,
      hourly_rate,
      phone,
      location,
      service_radius,
      profile_image,
    } = req.body;
    
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO bartenders 
       (user_id, business_name, bio, experience_years, specialties, 
        hourly_rate, phone, location, service_radius, profile_image, published) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, false)`,
      [
        user_id,
        business_name,
        bio,
        experience_years,
        specialties,
        hourly_rate,
        phone,
        location,
        service_radius,
        profile_image,
      ]
    );
    
    res.status(201).json({
      success: true,
      message: 'Bartender profile created successfully',
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error('Error creating bartender:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating bartender profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update bartender profile
export const updateBartender = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const allowedFields = [
      'business_name',
      'bio',
      'experience_years',
      'specialties',
      'hourly_rate',
      'phone',
      'location',
      'service_radius',
      'profile_image',
      'cover_image',
      'available',
    ];
    
    const updateFields: string[] = [];
    const values: any[] = [];
    
    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update',
      });
    }
    
    values.push(id);
    
    await db.query(
      `UPDATE bartenders SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );
    
    res.json({
      success: true,
      message: 'Bartender profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating bartender:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating bartender profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Publish bartender profile
export const publishBartender = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE bartenders SET published = true WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Bartender profile published successfully',
    });
  } catch (error) {
    console.error('Error publishing bartender:', error);
    res.status(500).json({
      success: false,
      message: 'Error publishing bartender profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Add bartender service
export const addBartenderService = async (req: Request, res: Response) => {
  try {
    const { bartender_id, service_name, description, price, duration, max_guests } = req.body;
    
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO bartender_services 
       (bartender_id, service_name, description, price, duration, max_guests) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [bartender_id, service_name, description, price, duration, max_guests]
    );
    
    res.status(201).json({
      success: true,
      message: 'Service added successfully',
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding service',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Create bartender booking
export const createBartenderBooking = async (req: Request, res: Response) => {
  try {
    const {
      bartender_id,
      service_id,
      customer_name,
      customer_email,
      customer_phone,
      event_date,
      event_time,
      event_location,
      guest_count,
      duration,
      total_price,
      special_requests,
    } = req.body;
    
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO bartender_bookings 
       (bartender_id, service_id, customer_name, customer_email, customer_phone,
        event_date, event_time, event_location, guest_count, duration, 
        total_price, special_requests, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        bartender_id,
        service_id,
        customer_name,
        customer_email,
        customer_phone,
        event_date,
        event_time,
        event_location,
        guest_count,
        duration,
        total_price,
        special_requests,
      ]
    );
    
    // Update bartender total bookings
    await db.query(
      'UPDATE bartenders SET total_bookings = total_bookings + 1 WHERE id = ?',
      [bartender_id]
    );
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Add review for bartender
export const addBartenderReview = async (req: Request, res: Response) => {
  try {
    const {
      bartender_id,
      booking_id,
      customer_name,
      customer_email,
      rating,
      review_text,
    } = req.body;
    
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO bartender_reviews 
       (bartender_id, booking_id, customer_name, customer_email, rating, review_text) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [bartender_id, booking_id, customer_name, customer_email, rating, review_text]
    );
    
    // Update bartender average rating
    const [ratingResult] = await db.query<RowDataPacket[]>(
      'SELECT AVG(rating) as avg_rating FROM bartender_reviews WHERE bartender_id = ?',
      [bartender_id]
    );
    
    const avgRating = ratingResult[0].avg_rating;
    
    await db.query('UPDATE bartenders SET rating = ? WHERE id = ?', [
      avgRating,
      bartender_id,
    ]);
    
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
