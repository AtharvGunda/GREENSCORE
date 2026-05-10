import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbQuery } from '../config/database';
import { env } from '../config/env';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, gstin, sector, annual_revenue_cr, state, city, email, password } = req.body;

    const existingUser = await dbQuery('SELECT id FROM companies WHERE email = $1', [email]);
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await dbQuery(
      `INSERT INTO companies (name, gstin, sector, annual_revenue_cr, state, city, email, password_hash)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, email, sector, role`,
      [name, gstin, sector, annual_revenue_cr, state, city, email, password_hash]
    );

    const user = newUser.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await dbQuery('SELECT * FROM companies WHERE email = $1', [email]);
    if (!result.rowCount || result.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '1d' });

    const { password_hash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await dbQuery('SELECT id, name, gstin, sector, annual_revenue_cr, state, city, email, role, created_at FROM companies WHERE id = $1', [userId]);
    
    if (!result.rowCount || result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get Me error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
