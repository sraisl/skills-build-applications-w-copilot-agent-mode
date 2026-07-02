"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    equipment: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
}, {
    timestamps: true,
});
exports.WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
