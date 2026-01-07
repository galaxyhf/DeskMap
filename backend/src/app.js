import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import corsMiddleware from './middleware/cors.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';
import atendimentoRoutes from './routes/atendimento.routes.js';
import swaggerSpec from './config/swagger.js';

const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

// Routes
app.use('/api/atendimentos', atendimentoRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'DeskMap API - Sistema de Gerenciamento de Atendimentos Técnicos',
    version: '1.0.0',
    docs: '/docs',
  });
});

// Error Middleware (must be last)
app.use(errorMiddleware);

export default app;
