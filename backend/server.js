import app from './src/app.js';
import sequelize from './src/config/database.js';
import { Atendimento } from './src/models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Sincronizar modelos com banco de dados
    await sequelize.sync({ alter: true });
    console.log('✓ Banco de dados sincronizado');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`✓ Servidor rodando em http://localhost:${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('✗ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();
