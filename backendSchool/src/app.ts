import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { config } from './config';
import { apiRateLimit } from './middlewares/rateLimit.middleware';

const app: Application = express();

// Security & Utility Middlewares
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));

// Parse raw body for webhook routes (must come BEFORE express.json())
// Paystack webhooks need the raw body for HMAC signature verification
app.use('/api/webhooks', express.raw({ type: 'application/json' }));

// Standard JSON parsing for all other routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Global API rate limit
app.use('/api', apiRateLimit);

// Routes
app.use('/api', routes);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
