"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const activity_model_1 = require("./models/activity.model");
const leaderboard_model_1 = require("./models/leaderboard.model");
const team_model_1 = require("./models/team.model");
const user_model_1 = require("./models/user.model");
const workout_model_1 = require("./models/workout.model");
const app = (0, express_1.default)();
const port = 8000;
const mongoPort = 27017;
const mongoUri = process.env.MONGO_URI ?? `mongodb://127.0.0.1:${mongoPort}/octofit_db`;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/api', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API',
        baseUrl: apiBaseUrl,
    });
});
app.get('/api/health', async (_req, res) => {
    const mongooseState = mongoose_1.default.connection.readyState;
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        baseUrl: apiBaseUrl,
        mongodb: mongooseState === 1 ? 'connected' : 'disconnected',
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await user_model_1.UserModel.find().populate('team').lean();
    res.json({
        resource: 'users',
        items: users,
    });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await team_model_1.TeamModel.find().lean();
    res.json({
        resource: 'teams',
        items: teams,
    });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await activity_model_1.ActivityModel.find().populate('user').sort({ performedAt: -1 }).lean();
    res.json({
        resource: 'activities',
        items: activities,
    });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_model_1.LeaderboardModel.find().populate('user').sort({ rank: 1 }).lean();
    res.json({
        resource: 'leaderboard',
        items: leaderboard,
    });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await workout_model_1.WorkoutModel.find().lean();
    res.json({
        resource: 'workouts',
        items: workouts,
    });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        // Keep API service fixed to port 8000.
        app.listen(port, () => {
            console.log(`Octofit backend listening on http://localhost:${port}`);
            console.log(`API base URL: ${apiBaseUrl}`);
            console.log(`MongoDB connection URI: ${mongoUri}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
