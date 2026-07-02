"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 8000;
const mongoPort = 27017;
const mongoUri = process.env.MONGO_URI ?? `mongodb://127.0.0.1:${mongoPort}/octofit_db`;
app.use(express_1.default.json());
app.get('/api/health', async (_req, res) => {
    const mongooseState = mongoose_1.default.connection.readyState;
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        mongodb: mongooseState === 1 ? 'connected' : 'disconnected',
    });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        // Keep API service fixed to port 8000.
        app.listen(port, () => {
            console.log(`Octofit backend listening on http://localhost:${port}`);
            console.log(`MongoDB connection URI: ${mongoUri}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
