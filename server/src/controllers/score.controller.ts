import { Request, Response } from 'express';
import { dbQuery } from '../config/database';

export const getCurrentScore = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const scoreRes = await dbQuery('SELECT * FROM green_scores WHERE company_id = $1 ORDER BY calculated_at DESC LIMIT 1', [userId]);
    
    if (!scoreRes.rowCount) {
      return res.status(404).json({ error: 'No score found for this company' });
    }

    res.json(scoreRes.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getScoreHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const scores = await dbQuery('SELECT * FROM green_scores WHERE company_id = $1 ORDER BY calculated_at DESC', [userId]);
    res.json(scores.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBenchmark = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const companyRes = await dbQuery('SELECT sector FROM companies WHERE id = $1', [userId]);
    if (!companyRes.rowCount) return res.status(404).json({ error: 'Company not found' });
    
    const benchmarkRes = await dbQuery('SELECT * FROM sector_benchmarks WHERE sector = $1', [companyRes.rows[0].sector]);
    res.json(benchmarkRes.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
