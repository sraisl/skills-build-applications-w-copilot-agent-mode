import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoPort = 27017;
const mongoUri = process.env.MONGO_URI ?? `mongodb://127.0.0.1:${mongoPort}/octofit_db`;

app.use(express.json());

app.get('/api/health', async (_req, res) => {
  const mongooseState = mongoose.connection.readyState;
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    mongodb: mongooseState === 1 ? 'connected' : 'disconnected',
  });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    // Keep API service fixed to port 8000.
    app.listen(port, () => {
      console.log(`Octofit backend listening on http://localhost:${port}`);
      console.log(`MongoDB connection URI: ${mongoUri}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
