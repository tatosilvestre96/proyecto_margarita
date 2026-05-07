import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Socket.io events
io.on('connection', (socket) => {
  console.log(`[Socket.io] Usuario conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Usuario desconectado: ${socket.id}`);
  });
});

// Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Proyecto Margarita API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: '🌼 Bienvenido a Proyecto Margarita API',
    version: '0.1.0',
    endpoints: {
      health: '/api/health',
      docs: '/docs',
    },
  });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response) => {
  console.error('[Error]', err);
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: err.message,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: `Route ${req.path} not found`,
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🌼 PROYECTO MARGARITA - SERVIDOR    ║
╚════════════════════════════════════════╝

✅ Server running on http://localhost:${PORT}
✅ Socket.io listening on ws://localhost:${PORT}
✅ CORS enabled for ${process.env.FRONTEND_URL || 'http://localhost:5173'}

Environment: ${process.env.NODE_ENV || 'development'}
`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n📌 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export { app, io };
