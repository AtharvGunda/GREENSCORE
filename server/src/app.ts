import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import carbonRoutes from './routes/carbon.routes';
import scoreRoutes from './routes/score.routes';
import loansRoutes from './routes/loans.routes';
import faqRoutes from './routes/faq.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Root route to prevent "Cannot GET /"
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to the GreenScore API!', 
    frontend_url: 'http://localhost:5173' 
  });
});

// Basic health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: env.NODE_ENV });
});

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/carbon', carbonRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/loans', loansRoutes);
app.use('/api/faq', faqRoutes);

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

export default app;
